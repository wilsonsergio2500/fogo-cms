import { Injectable } from '@angular/core';
import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, from, of } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { FirebasePaginationStateModel } from '@firebase-module/types/firebase-pagination';
import { ConfirmationDialogService } from "@customComponents/ui-elements/confirmation-dialog/confirmation-dialog.service";
import { SnackbarStatusService } from '@customComponents/ui-elements/snackbar-status/service/snackbar-status.service';
import { AuthState } from '@states/auth/auth.state';
import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';
import { ProductFireStore } from './schema/product.firebase';
import { IProductFirebaseModel } from './schema/product.schema';
import { IProductStateModel } from './product.model';
import { ProductSetAsLoadingAction, ProductSetAsDoneAction, ProductCreateAction, ProductUpdateAction, ProductRemoveAction, ProductGetByIdAction, ProductLoadFirstPageAction, ProductLoadNextPageAction, ProductLoadPreviousPageAction, ProductSetOrderByFieldAction, ProductLoadAction } from './product.actions';
import { tap, mergeMap, delay, filter, finalize, catchError } from 'rxjs/operators';
import { Logger } from '@appUtils/logger';
import { ListingMergeAction, ListingRemoveAction } from '@states/store/listing/listing.actions';


@State<IProductStateModel>({
  name: 'productState',
  defaults: <IProductStateModel>{
    loading: false,
    paginationState: new FirebasePaginationStateModel<IProductFirebaseModel>(),
    currentId: null,
    current: null,
    selected: null,
    category: null,
  }
})
@Injectable()
export class StoreProductState {

  private schemas: ProductFireStore;
  private subscription: Subscription;
  constructor(
    private store: Store,
    private snackBarStatus: SnackbarStatusService,
    private confirmationDialog: ConfirmationDialogService,
    angularFireStore: AngularFirestore
  ) {
    this.schemas = new ProductFireStore(angularFireStore);
  }

  @Selector()
  static IsLoading(state: IProductStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getPage(state: IProductStateModel): IProductFirebaseModel[] {
    return state.paginationState.items;
  }

  @Selector()
  static getPageSize(state: IProductStateModel): number {
    return state.paginationState.pageSize;
  }

  @Selector()
  static getCollectionTotalSize(state: IProductStateModel): number {
    return state.paginationState.items.length;
  }

  @Selector()
  static getNextEnabled(state: IProductStateModel): boolean {
    return state.paginationState.next;
  }
  @Selector()
  static getPreviousEnabled(state: IProductStateModel): boolean {
    return state.paginationState.prev;
  }
  @Selector()
  static IsPaginatorEnabled(state: IProductStateModel): boolean {
    return state.paginationState.prev || state.paginationState.next;
  }

  @Selector()
  static getCurrent(state: IProductStateModel): IProductFirebaseModel {
    return state.current;
  }

  @Selector()
  static getSelected(state: IProductStateModel): IProductFirebaseModel {
    return state.selected;
  }

  @Action(ProductSetAsDoneAction)
  onDone(ctx: StateContext<IProductStateModel>) {
    ctx.patchState({
      loading: false
    });
  }
  @Action(ProductSetAsLoadingAction)
  onLoading(ctx: StateContext<IProductStateModel>) {
    ctx.patchState({
      loading: true
    });
  }

  @Action(ProductCreateAction)
  onCreate(ctx: StateContext<IProductStateModel>, action: ProductCreateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ createDate: now, updatedDate: now, updatedBy: user, createdBy: user }
        const form = { ...action.request, ...metadata };
        return from(this.schemas.create(form));
      }),
      mergeMap(form => ctx.dispatch(new ListingMergeAction(form))),
      tap((t) => {
        this.snackBarStatus.OpenComplete('Product Succesfully Created');
        ctx.dispatch(new Navigate(['/admin/store/products']));
      })
    );
  }

  @Action(ProductSetOrderByFieldAction)
  onUpdateOrderByField(ctx: StateContext<IProductStateModel>, action: ProductSetOrderByFieldAction) {
    const { orderByField } = action;
    const { paginationState } = ctx.getState();
    const { orderByField: currentOrderByField } = paginationState
    const changed = orderByField != currentOrderByField;
    const newPaginationState = { ...paginationState, orderByField };
    ctx.patchState({ paginationState: newPaginationState });
    if (changed) {
      this.subscription = null;
      ctx.dispatch(new ProductLoadFirstPageAction());
    }
  }

  @Action(ProductUpdateAction)
  onUpdateAction(ctx: StateContext<IProductStateModel>, action: ProductUpdateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ updatedDate: now, updatedBy: user }
        const form = { ...action.request, ...metadata };
        return from(this.schemas.update(action.request.Id, form)).pipe(mergeMap(() => ctx.dispatch(new ListingMergeAction(form))));
      }),
      delay(1000),
      tap(() => {
        this.snackBarStatus.OpenComplete('Product Updated Succesfully');
        ctx.dispatch(new Navigate(['/admin/store/products']));
      })
    );
  }

  @Action(ProductRemoveAction)
  onRemove(ctx: StateContext<IProductStateModel>, action: ProductRemoveAction) {
    const { Id } = action.request;
    return this.confirmationDialog.OnConfirm('Are you sure you would like to delete this Product?').pipe(
      mergeMap(() => from(this.schemas.delete(Id)).pipe(mergeMap(() => ctx.dispatch(new ListingRemoveAction(action.request))))),
      mergeMap(() => ctx.dispatch(new ProductLoadAction())),
      finalize(() => this.snackBarStatus.OpenComplete('Product has been Removed')),
    )
  }

  @Action(ProductGetByIdAction)
  onGetById(ctx: StateContext<IProductStateModel>, action: ProductGetByIdAction) {
    const { id: currentId } = action;
    ctx.dispatch(new ProductSetAsLoadingAction());
    return from(this.schemas.queryCollection(ref => ref.where('Id', '==', currentId)).get()).pipe(
      tap(records => {
        if (records?.docs.length) {
          const current = records.docs[0].data() as IProductFirebaseModel;
          ctx.patchState({ currentId, current });
        }
      }),
      delay(1000),
      mergeMap(() => ctx.dispatch(new ProductSetAsDoneAction()))
    )
  }

  @Action(ProductLoadAction)
  onProductLoad(ctx: StateContext<IProductStateModel>) {
    const { paginationState } = ctx.getState();
    const { pageSize, orderByField } = paginationState;
    return this.schemas.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc'))
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
          Logger.LogTable(`Firebase Paginate Product[Page:${pagination_count + 1}]`, items);
        }),
        finalize(() => ctx.dispatch(new ProductSetAsDoneAction()))
      )
  }

  @Action(ProductLoadFirstPageAction)
  onGoToFirstPage(ctx: StateContext<IProductStateModel>) {
    return ctx.dispatch(new ProductSetAsLoadingAction()).pipe(
      delay(100),
      mergeMap(() => ctx.dispatch(new ProductLoadAction()))
    );
  }

  @Action(ProductLoadNextPageAction)
  onNextPage(ctx: StateContext<IProductStateModel>) {
    const { paginationState } = ctx.getState();
    let { pageSize, last, pagination_count, prev_start_at, first, orderByField } = paginationState;
    return this.schemas.queryCollection(ref => ref.limit(pageSize).orderBy(orderByField, 'desc').startAfter(last))
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
          Logger.LogTable(`Firebase Paginate Product[Page:${pagination_count + 1}]`, items);

        })
        , catchError(error => {
          const newPaginationState = { ...paginationState, next: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      );
  }

  @Action(ProductLoadPreviousPageAction)
  onPreviousPage(ctx: StateContext<IProductStateModel>) {
    const { paginationState } = ctx.getState();
    let { pageSize, orderByField, first, pagination_count, prev_start_at } = paginationState;
    return this.schemas.queryCollection(ref => ref.orderBy(orderByField, 'desc').endBefore(first).limit(pageSize))
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
          Logger.LogTable(`Firebase Paginate Product[Page:${pagination_count + 1}]`, items);
        }),
        catchError(error => {
          const newPaginationState = { ...paginationState, prev: false };
          ctx.patchState({ paginationState: newPaginationState })
          return of("INCORRECT_SEQUENCE_ERROR");
        })
      )
  }

}
