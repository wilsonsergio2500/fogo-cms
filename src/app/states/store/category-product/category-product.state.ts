import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, from } from 'rxjs';
import { FirebasePaginationInMemoryStateModel } from '@firebase-module/types/firebase-pagination-inmemory';
import { CategoryProductFireStore } from './schema/category-product.firebase';
import { ICategoryProductFirebaseModel } from './schema/category-product.schema';
import { ICategoryProductStateModel } from './category-product.model';
import { CategoryProductSetAsLoadingAction, CategoryProductSetAsDoneAction, CategoryProductCreateAction, CategoryProductLoadItemsAction, CategoryProductSetPaginatorAction, CategoryProductPaginateItemsAction, CategoryProductRemoveAction, CategoryProductGetByIdAction } from './category-product.actions';
import { tap, mergeMap, delay } from 'rxjs/operators';


@State<ICategoryProductStateModel>({
    name: 'categoryProductState',
    defaults: <ICategoryProductStateModel>{
        loading: false,
        paginationState: new FirebasePaginationInMemoryStateModel<ICategoryProductFirebaseModel>(),
        currentId: null,
        current: null,
        selected: null
    }
})
@Injectable()
export class StoreCategoryProductState {

    private schemas: CategoryProductFireStore;
    private subscription: Subscription;
    constructor(angularFireStore: AngularFirestore){
      this.schemas = new CategoryProductFireStore(angularFireStore);
    }

  @Selector()
  static IsLoading(state: ICategoryProductStateModel) : boolean {
    return state.loading;
  }

  @Selector()
  static getCurrentPage(state: ICategoryProductStateModel) : ICategoryProductFirebaseModel[] {
    return state.paginationState.page;
  }

  @Selector()
  static getPageSize(state: ICategoryProductStateModel) : number {
    return state.paginationState.paginator.pageSize;
  }

  @Selector()
  static getCollectionTotalSize(state: ICategoryProductStateModel) : number {
    return state.paginationState.items.length;
  }
  @Selector()
  static getAllPages(state: ICategoryProductStateModel) : ICategoryProductFirebaseModel[] {
    return state.paginationState.items;
  }

  @Selector()
  static getCurrent(state: ICategoryProductStateModel) : ICategoryProductFirebaseModel {
    return state.current;
  }

  @Selector()
  static getSelected(state: ICategoryProductStateModel) : ICategoryProductFirebaseModel {
    return state.selected;
  }


  @Action(CategoryProductSetAsDoneAction)
 onDone(ctx: StateContext<ICategoryProductStateModel>) {
    ctx.patchState({
        loading: false
    });
  }
  @Action(CategoryProductSetAsLoadingAction)
  onLoading(ctx: StateContext<ICategoryProductStateModel>) {
    ctx.patchState({
        loading: true
    });
  }

  @Action(CategoryProductCreateAction)
  onCreate(ctx: StateContext<ICategoryProductStateModel>, action: CategoryProductCreateAction) {
    const { category, Id } = action.request;
    const form = { ...action.request };
    return from(this.schemas.merge(`${category}/products/${Id}`, form));
  }

  @Action(CategoryProductRemoveAction)
  onRemove(ctx: StateContext<ICategoryProductStateModel>, action: CategoryProductRemoveAction) {
    const { category, Id } = action.request;
    return from(this.schemas.delete(`${category}/products/${Id}`));
  }

  @Action(CategoryProductLoadItemsAction)
  onLoadItems(ctx: StateContext<ICategoryProductStateModel>) {
    const { paginationState } = ctx.getState();
    const { orderByField, paginator } = paginationState;
    if (!this.subscription) {
      ctx.dispatch(new CategoryProductSetAsLoadingAction());
      this.subscription = this.schemas.collection$(ref => ref.orderBy(orderByField, 'desc')).pipe(
        tap(items => {
          const newPaginationState = { ...paginationState, items };
          ctx.patchState({ paginationState: newPaginationState });
        }),
        mergeMap(() => ctx.dispatch(new CategoryProductSetPaginatorAction({ ...paginator }))),
        mergeMap(() => ctx.dispatch(new CategoryProductSetAsDoneAction()))
      ).subscribe();
    }
  }

  @Action(CategoryProductSetPaginatorAction)
  onSetPaginate(ctx: StateContext<ICategoryProductStateModel>, action: CategoryProductSetPaginatorAction) {
    let { paginationState } = ctx.getState();
    let { paginator } = action;

    paginationState = { ...paginationState, paginator };
    ctx.patchState({ paginationState });
    return ctx.dispatch(new CategoryProductPaginateItemsAction());
  }

  @Action(CategoryProductPaginateItemsAction)
  onPaginate(ctx: StateContext<ICategoryProductStateModel>) {
    let { paginationState } = ctx.getState();
    let { paginator } = paginationState;
    let items = [...paginationState.items];
    const page = items.splice(paginator.pageIndex * paginator.pageSize, paginator.pageSize);

    paginationState = { ...paginationState, page };
    ctx.patchState({ paginationState });
  }

  @Action(CategoryProductGetByIdAction)
  onGetById(ctx: StateContext<ICategoryProductStateModel>, action: CategoryProductGetByIdAction){
    const { id: currentId } = action;
    ctx.dispatch(new CategoryProductSetAsLoadingAction());
    return from(this.schemas.queryCollection(ref => ref.where('Id', '==', currentId)).get()).pipe(
      tap(records => {
        if (records?.docs.length) {
          const current = records.docs[0].data() as ICategoryProductFirebaseModel;
          ctx.patchState({ currentId, current });
        }
      }),
      delay(1000),
      mergeMap(() => ctx.dispatch(new CategoryProductSetAsDoneAction()))
    )
  }


}
