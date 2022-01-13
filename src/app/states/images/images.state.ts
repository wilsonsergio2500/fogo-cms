import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { IImagesStateModel } from './images.model';
import { ImagesDone, ImagesLoading, ImagesCreateRecordAction, ImagesLoadFirstPageAction, ImagesLoadNextPageAction, ImagesLoadPreviousPageAction, ImagesRemoveAction, ImagesSetGallery, ImageClearGallery } from './images.actions';
import { tap, mergeMap, catchError, filter, finalize } from 'rxjs/operators';
import { FirebasePaginationStateModel } from '@firebase-module/types/firebase-pagination';
import { IImageFirebaseModel } from '@firebase-schemas/images/image.model';
import { ImagesFireStore } from '@firebase-schemas/images/image.firebase';
import { from, of, Subscription } from 'rxjs';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { ConfirmationDialogService } from '../../components/ui-elements/confirmation-dialog/confirmation-dialog.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthState } from '@states/auth/auth.state';
import { Logger } from '@appUtils/logger';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { CMS_GALLERY } from './gallery.types';


@State<IImagesStateModel>({
  name: 'imagesState',
  defaults: <IImagesStateModel>{
    loading: true,
    paginationState: new FirebasePaginationStateModel<IImageFirebaseModel>(20),
    gallery: CMS_GALLERY.images
  }
})
@Injectable()
export class ImagesState {

  private schema: ImagesFireStore;
  constructor(
    private store: Store,
    private snackBarStatus: SnackbarStatusService,
    private confirmationDialog: ConfirmationDialogService,
    private storage: AngularFireStorage,
    angularFireStore: AngularFirestore
  ) {
    this.schema = new ImagesFireStore(angularFireStore);
  }

  @Selector()
  static IsLoading(state: IImagesStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getPage(state: IImagesStateModel) {
    return state.paginationState.items;
  }
  @Selector()
  static getNextEnabled(state: IImagesStateModel): boolean {
    return state.paginationState.next;
  }
  @Selector()
  static getPreviousEnabled(state: IImagesStateModel): boolean {
    return state.paginationState.prev;
  }
  @Selector()
  static IsPaginatorEnabled(state: IImagesStateModel): boolean {
    return state.paginationState.prev || state.paginationState.next;
  }

  @Action(ImagesDone)
  onDone(ctx: StateContext<IImagesStateModel>) {
    ctx.patchState({
      loading: false
    });
  }
  @Action(ImagesLoading)
  onLoading(ctx: StateContext<IImagesStateModel>) {
    ctx.patchState({
      loading: true
    });
  }

  @Action(ImagesSetGallery)
  onSetGallery(ctx: StateContext<IImagesStateModel>, action: ImagesSetGallery) {
    const { gallery } = action;
    ctx.patchState({ gallery });

    return ctx.dispatch(new ImagesLoading())
      .pipe(
        mergeMap(() => ctx.dispatch(new ImageClearGallery())),
        mergeMap(() => ctx.dispatch(new ImagesLoadFirstPageAction()))
      );
  }

  @Action(ImageClearGallery)
  onClearGallery(ctx: StateContext<IImagesStateModel>) {
    const { paginationState } = ctx.getState();
    const newPaginationState = { ...paginationState, items: [], next: false, prev:false };
    ctx.patchState({ paginationState: newPaginationState });
  }

  @Action(ImagesCreateRecordAction)
  onCreateRecordAction(ctx: StateContext<IImagesStateModel>, action: ImagesCreateRecordAction) {
    const { gallery } = ctx.getState();
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const form = { ...action.request, gallery };
        form.createDate = Date.now();
        form.createdBy = user;
        return from(this.schema.create(form));
      }),
      tap(() => {
        this.snackBarStatus.OpenComplete('Image succesfully added');
      }),
      mergeMap(() => ctx.dispatch(new ImagesLoadFirstPageAction()))
    )
  }

  @Action(ImagesLoadFirstPageAction)
  onGoToFirstPage(ctx: StateContext<IImagesStateModel>) {
    const { paginationState, gallery } = ctx.getState();
    const { pageSize, orderByField, begining } = paginationState;
    return this.schema.queryCollection(ref => ref.where('gallery', '==', gallery).limit(pageSize).orderBy(orderByField, 'desc'))
      .get().pipe(
        filter(models => !!models.docs?.length),
        tap(models => {
          const currentSize = models.docs.length;
          const next = currentSize === pageSize;
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          const pagination_count = 0;
          const prev = pagination_count != 0;
          const prev_start_at = [first];
          const newPaginationState = { ...paginationState, prev, first, last, items, pagination_count, prev_start_at, next };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Images[Page:${pagination_count + 1}]`, items);
        }),
        finalize(() => ctx.dispatch(new ImagesDone()))
      )

  }

  @Action(ImagesLoadNextPageAction)
  onNextPage(ctx: StateContext<IImagesStateModel>) {
    const { paginationState, gallery } = ctx.getState();
    let { pageSize, last, pagination_count, prev_start_at, first, orderByField } = paginationState;
    return this.schema.queryCollection(ref => ref.where('gallery', '==', gallery).limit(pageSize).orderBy(orderByField, 'desc').startAfter(last))
      .get().pipe(
        tap(models => {
          const currentSize = models.docs.length;
          let next = currentSize === pageSize;
          const prev = true;
          if (!currentSize) {
            next = false;
            return;
          }
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          pagination_count++;
          const prevStartAt = [...prev_start_at, first];
          const newPaginationState = { ...paginationState, next, first, last, items, pagination_count, prev_start_at: prevStartAt, prev };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Images[Page:${pagination_count + 1}]`, items);

        })
        , catchError(error => {
          const newPaginationState = { ...paginationState, next: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      );
  }

  @Action(ImagesLoadPreviousPageAction)
  onPreviousPage(ctx: StateContext<IImagesStateModel>) {
    const { paginationState, gallery } = ctx.getState();
    let { pageSize, orderByField, first, pagination_count, prev_start_at } = paginationState;
    return this.schema.queryCollection(ref => ref.where('gallery', '==', gallery).orderBy(orderByField, 'desc').endBefore(first).limit(pageSize))
      .get().pipe(
        tap(models => {
          const next = true;
          const currentSize = models.docs.length;
          const first = models.docs[0].data()[orderByField];
          const last = models.docs[currentSize - 1].data()[orderByField];
          let items = [];
          for (let it of models.docs) {
            items.push(it.data());
          }
          pagination_count--;
          const prev = pagination_count != 0;
          prev_start_at = prev_start_at.slice(0, prev_start_at.length - 1);
          const newPaginationState = { ...paginationState, prev, first, last, items, pagination_count, prev_start_at, next };
          ctx.patchState({ paginationState: newPaginationState });
          Logger.LogTable(`Firebase Paginate Images[Page:${pagination_count + 1}]`, items);
        }),
        catchError(error => {
          const newPaginationState = { ...paginationState, prev: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      )
  }

  @Action(ImagesRemoveAction)
  onRemoveImage(ctx: StateContext<IImagesStateModel>, action: ImagesRemoveAction) {
    const { id, path } = action.request;
    
    return this.confirmationDialog.OnConfirm('Are you sure you would like to delete this image?').pipe(
      mergeMap(() => {
        const fileRef = this.storage.refFromURL(path);
        return fileRef.delete();
      }),
      mergeMap(() => from(this.schema.delete(id))),
      tap(() => this.snackBarStatus.OpenComplete('Image has been Removed')),
      mergeMap(() => ctx.dispatch(new ImagesLoadFirstPageAction()))
    )
  }


}
