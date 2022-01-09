import { Injectable } from '@angular/core';
import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { ICategoryStateModel } from './category.model';
import { CategoryCreateAction, CategoryDoneAction, CategoryLoadingAction, CategoryLoadItemsAction, CategoryPaginateItems, CategoryRemoveAction, CategorySetPaginatorAction, CategoryUpdateAction } from './category.actions';
import { tap, mergeMap, delay } from 'rxjs/operators';
import { FirebasePaginationInMemoryStateModel } from '../../../firebase/types/firebase-pagination-inmemory';
import { IStoreCategoryFirebaseModel } from '@firebase-schemas/store/categories/store-categories.model';
import { from, Subscription } from 'rxjs';
import { StoreCategoryFireStore } from '@firebase-schemas/store/categories/store-categories.firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthState } from '../../auth/auth.state';
import { IFireBaseEntity } from '../../../firebase/types/firebase-entity';
import { SnackbarStatusService } from '../../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { ConfirmationDialogService } from '../../../components/ui-elements/confirmation-dialog/confirmation-dialog.service';
import { Navigate } from '@ngxs/router-plugin';


@State<ICategoryStateModel>({
  name: 'storeCategory',
  defaults: <ICategoryStateModel>{
    loading: true,
    paginationState: new FirebasePaginationInMemoryStateModel<IStoreCategoryFirebaseModel>(),
    current: null
  }
})
@Injectable()
export class CategoryState {

  private schema: StoreCategoryFireStore;
  private subscription: Subscription;
  constructor(
    private store: Store,
    private snackBarStatus: SnackbarStatusService,
    private confirmationDialog: ConfirmationDialogService,
    angularFireStore: AngularFirestore
  ) {
    this.schema = new StoreCategoryFireStore(angularFireStore);
  }

  @Selector()
  static IsLoading(state: ICategoryStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getPage(state: ICategoryStateModel) {
    return state.paginationState.page;
  }

  @Selector()
  static getPageSize(state: ICategoryStateModel) {
    return state.paginationState.paginator.pageSize;
  }

  @Selector()
  static getCollectionTotalSize(state: ICategoryStateModel) {
    return state.paginationState.items.length;
  }

  @Selector()
  static getAllPages(state: ICategoryStateModel) {
    return state.paginationState.items;
  }

  @Action(CategoryDoneAction)
  onDone(ctx: StateContext<ICategoryStateModel>) {
    ctx.patchState({
      loading: false
    });
  }

  @Action(CategoryLoadingAction)
  onLoading(ctx: StateContext<ICategoryStateModel>) {
    ctx.patchState({
      loading: true
    });
  }

  @Action(CategoryCreateAction)
  onPageCreate(ctx: StateContext<ICategoryStateModel>, action: CategoryCreateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ createDate: now, updatedDate: now, updatedBy: user, createdBy: user }
        const form = { ...action.request, ...metadata };
        return from(this.schema.create(form))
      }),
      tap(() => {
        this.snackBarStatus.OpenComplete('Category Succesfully Created');
        ctx.dispatch(new Navigate(['admin/pages/list']));
      })
    );
  }

  @Action(CategoryLoadItemsAction)
  getElements(ctx: StateContext<ICategoryStateModel>) {
    const { paginationState } = ctx.getState();
    const { orderByField, paginator } = paginationState;
    if (!this.subscription) {
      ctx.dispatch(new CategoryLoadingAction());
      this.subscription = this.schema.collection$(ref => ref.orderBy(orderByField, 'desc')).pipe(
        tap(items => {
          const newPaginationState = { ...paginationState, items };
          ctx.patchState({ paginationState: newPaginationState });
        }),
        mergeMap(() => ctx.dispatch(new CategorySetPaginatorAction({ ...paginator }))),
        mergeMap(() => ctx.dispatch(new CategoryDoneAction()))
      ).subscribe();
    }
    
  }

  @Action(CategorySetPaginatorAction)
  onSetPaginate(ctx: StateContext<ICategoryStateModel>, action: CategorySetPaginatorAction) {
    let { paginationState } = ctx.getState();
    let { paginator } = action;

    paginationState = { ...paginationState, paginator };
    ctx.patchState({ paginationState });
    return ctx.dispatch(new CategoryPaginateItems());
  }

  @Action(CategoryPaginateItems)
  onPaginate(ctx: StateContext<ICategoryStateModel>) {
    let { paginationState } = ctx.getState();
    let { paginator } = paginationState;
    let items = [...paginationState.items];
    const page = items.splice(paginator.pageIndex * paginator.pageSize, paginator.pageSize);

    paginationState = { ...paginationState, page };
    ctx.patchState({ paginationState });
  }

  @Action(CategoryRemoveAction)
  onRemovePage(ctx: StateContext<ICategoryStateModel>, action: CategoryRemoveAction) {
    const { Id } = action.request;
    return this.confirmationDialog.OnConfirm('Are you sure you would like to delete this Category?').pipe(
      mergeMap(() => from(this.schema.delete(Id))),
      tap(() => this.snackBarStatus.OpenComplete('Category has been Removed')),
    )
  }

  @Action(CategoryUpdateAction)
  onUpdateAction(ctx: StateContext<ICategoryStateModel>, action: CategoryUpdateAction) {

    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ updatedDate: now, updatedBy: user }
        const form = { ...action.request, ...metadata };
        return this.schema.update(action.request.Id, form);
      }),
      delay(1000),
      tap(() => {
        this.snackBarStatus.OpenComplete('Category Updated Succesfully');
        ctx.dispatch(new Navigate(['admin/pages/list']));
      })
    );

  }

}
