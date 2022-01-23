import { Injectable } from '@angular/core';
import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, from } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { FirebasePaginationInMemoryStateModel } from '@firebase-module/types/firebase-pagination-inmemory';
import { ConfirmationDialogService } from "@customComponents/ui-elements/confirmation-dialog/confirmation-dialog.service";
import { SnackbarStatusService } from '@customComponents/ui-elements/snackbar-status/service/snackbar-status.service';
import { AuthState } from '@states/auth/auth.state';
import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';
import { CategoryFireStore } from './schema/category.firebase';
import { ICategoryFirebaseModel } from './schema/category.schema';
import { ICategoryStateModel } from './category.model';
import { CategorySetAsLoadingAction, CategorySetAsDoneAction, CategoryCreateAction, CategoryLoadItemsAction, CategorySetPaginatorAction, CategoryPaginateItemsAction, CategoryRemoveAction, CategoryGetByIdAction, CategoryUpdateAction, CategorySetOrderByFieldAction } from './category.actions';
import { tap, mergeMap, delay } from 'rxjs/operators';


@State<ICategoryStateModel>({
    name: 'categoryState',
    defaults: <ICategoryStateModel>{
        loading: false,
        paginationState: new FirebasePaginationInMemoryStateModel<ICategoryFirebaseModel>(),
        currentId: null,
        current: null,
        selected: null
    }
})
@Injectable()
export class StoreCategoryState {

    private schemas: CategoryFireStore;
    private subscription: Subscription;
    constructor(
        private store: Store,
        private snackBarStatus: SnackbarStatusService,
        private confirmationDialog: ConfirmationDialogService,
        angularFireStore: AngularFirestore
    ){
      this.schemas = new CategoryFireStore(angularFireStore);
    }

  @Selector()
  static IsLoading(state: ICategoryStateModel) : boolean {
    return state.loading;
  }

  @Selector()
  static getCurrentPage(state: ICategoryStateModel) : ICategoryFirebaseModel[] {
    return state.paginationState.page;
  }

  @Selector()
  static getPageSize(state: ICategoryStateModel) : number {
    return state.paginationState.paginator.pageSize;
  }

  @Selector()
  static getPageIndex(state: ICategoryStateModel): number {
    return state.paginationState.paginator.pageIndex;
  }

  @Selector()
  static getCollectionTotalSize(state: ICategoryStateModel) : number {
    return state.paginationState.items.length;
  }
  @Selector()
  static getAllPages(state: ICategoryStateModel) : ICategoryFirebaseModel[] {
    return state.paginationState.items;
  }

  @Selector()
  static getItems(state: ICategoryStateModel): ICategoryFirebaseModel[] {
    return state.paginationState.items;
  }

  @Selector()
  static getCurrent(state: ICategoryStateModel) : ICategoryFirebaseModel {
    return state.current;
  }

  @Selector()
  static getSelected(state: ICategoryStateModel) : ICategoryFirebaseModel {
    return state.selected;
  }


  @Action(CategorySetAsDoneAction)
 onDone(ctx: StateContext<ICategoryStateModel>) {
    ctx.patchState({
        loading: false
    });
  }
  @Action(CategorySetAsLoadingAction)
  onLoading(ctx: StateContext<ICategoryStateModel>) {
    ctx.patchState({
        loading: true
    });
  }

  @Action(CategoryCreateAction)
  onCreate(ctx: StateContext<ICategoryStateModel>, action: CategoryCreateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ createDate: now, updatedDate: now, updatedBy: user, createdBy: user }
        const form = { ...action.request, ...metadata };
        return from(this.schemas.create(form))
      }),
      tap(() => {
        this.snackBarStatus.OpenComplete('Category Succesfully Created');
        ctx.dispatch(new Navigate(['admin/store/categories']));
      })
    );
  }

  @Action(CategorySetOrderByFieldAction)
  onUpdateOrderByField(ctx: StateContext<ICategoryStateModel>, action: CategorySetOrderByFieldAction) {
    const { orderByField  } = action;
    const { paginationState } = ctx.getState();
    const { orderByField: currentOrderByField } = paginationState
    const changed = orderByField != currentOrderByField;
    const newPaginationState = { ...paginationState, orderByField };
    ctx.patchState({ paginationState: newPaginationState });
    if (changed) {
      this.subscription = null;
      ctx.dispatch(new CategoryLoadItemsAction());
    }
  }

  @Action(CategoryLoadItemsAction)
  onLoadItems(ctx: StateContext<ICategoryStateModel>) {
    const { paginationState } = ctx.getState();
    const { orderByField, paginator } = paginationState;
    if (!this.subscription) {
      ctx.dispatch(new CategorySetAsLoadingAction());
      this.subscription = this.schemas.collection$(ref => ref.orderBy(orderByField, 'desc')).pipe(
        tap(items => {
          const newPaginationState = { ...paginationState, items };
          ctx.patchState({ paginationState: newPaginationState });
        }),
        mergeMap(() => ctx.dispatch(new CategorySetPaginatorAction({ ...paginator }))),
        mergeMap(() => ctx.dispatch(new CategorySetAsDoneAction()))
      ).subscribe();
    }
  }

  @Action(CategorySetPaginatorAction)
  onSetPaginate(ctx: StateContext<ICategoryStateModel>, action: CategorySetPaginatorAction) {
    let { paginationState } = ctx.getState();
    let { paginator } = action;

    paginationState = { ...paginationState, paginator };
    ctx.patchState({ paginationState });
    return ctx.dispatch(new CategoryPaginateItemsAction());
  }

  @Action(CategoryPaginateItemsAction)
  onPaginate(ctx: StateContext<ICategoryStateModel>) {
    let { paginationState } = ctx.getState();
    let { paginator } = paginationState;
    let items = [...paginationState.items];
    const page = items.splice(paginator.pageIndex * paginator.pageSize, paginator.pageSize);

    paginationState = { ...paginationState, page };
    ctx.patchState({ paginationState });
  }

  @Action(CategoryRemoveAction)
  onRemove(ctx: StateContext<ICategoryStateModel>, action: CategoryRemoveAction) {
    const { Id } = action.request;
    return this.confirmationDialog.OnConfirm('Are you sure you would like to delete this Category?').pipe(
      mergeMap(() => from(this.schemas.delete(Id))),
      tap(() => this.snackBarStatus.OpenComplete('Category has been Removed')),
    )
  }

  @Action(CategoryGetByIdAction)
  onGetById(ctx: StateContext<ICategoryStateModel>, action: CategoryGetByIdAction){
    const { id: currentId } = action;
    ctx.dispatch(new CategorySetAsLoadingAction());
    return from(this.schemas.queryCollection(ref => ref.where('Id', '==', currentId)).get()).pipe(
      tap(records => {
        if (records?.docs.length) {
          const current = records.docs[0].data() as ICategoryFirebaseModel;
          ctx.patchState({ currentId, current });
        }
      }),
      delay(1000),
      mergeMap(() => ctx.dispatch(new CategorySetAsDoneAction()))
    )
  }

  @Action(CategoryUpdateAction)
  onUpdateAction(ctx: StateContext<ICategoryStateModel>, action: CategoryUpdateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ updatedDate: now, updatedBy: user }
        const form = { ...action.request, ...metadata };
        return this.schemas.update(action.request.Id, form);
      }),
      delay(1000),
      tap(() => {
        this.snackBarStatus.OpenComplete('Category Updated Succesfully');
        ctx.dispatch(new Navigate(['admin/store/categories']));
      })
    );
  }


}
