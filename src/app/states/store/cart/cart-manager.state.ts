import { Inject, Injectable } from '@angular/core';
import { Store, State, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, from } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { FirebasePaginationInMemoryStateModel } from '@firebase-module/types/firebase-pagination-inmemory';
import { ConfirmationDialogService } from "@customComponents/ui-elements/confirmation-dialog/confirmation-dialog.service";
import { SnackbarStatusService } from '@customComponents/ui-elements/snackbar-status/service/snackbar-status.service';
import { AuthState } from '@states/auth/auth.state';
import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';
import { CartManagerFireStore } from './schema/cart-manager.firebase';
import { ICartManagerFirebaseModel } from './schema/cart-manager.schema';
import { ICartManagerStateModel, ICartStorageModel } from './cart-manager.model';
import { CartManagerSetAsLoadingAction, CartManagerSetAsDoneAction, CartManagerCreateAction, CartManagerUpdateAction, CartManagerLoadItemsAction, CartManagerSetPaginatorAction, CartManagerPaginateItemsAction, CartManagerRemoveAction, CartManagerGetByIdAction, CartManagerAddProductAction, CartManagerLoadProductsFromStorageAction } from './cart-manager.actions';
import { tap, mergeMap, delay } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import '@appUtils/local-storage-helper';

const CART_STORAGE = "cart-items";

@State<ICartManagerStateModel>({
  name: 'cartManagerState',
  defaults: <ICartManagerStateModel>{
    loading: false,
    paginationState: new FirebasePaginationInMemoryStateModel<ICartManagerFirebaseModel>(),
    currentId: null,
    current: null,
    selected: null,
    products: []
  }
})
@Injectable()
export class StoreCartManagerState {

  private schemas: CartManagerFireStore;
  private subscription: Subscription;
  constructor(
    private store: Store,
    private snackBarStatus: SnackbarStatusService,
    private confirmationDialog: ConfirmationDialogService,
    @Inject(DOCUMENT) private document: Document,

    angularFireStore: AngularFirestore,
  ) {
    this.schemas = new CartManagerFireStore(angularFireStore);
  }

  @Selector()
  static IsLoading(state: ICartManagerStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getCurrentPage(state: ICartManagerStateModel): ICartManagerFirebaseModel[] {
    return state.paginationState.page;
  }

  @Selector()
  static getPageSize(state: ICartManagerStateModel): number {
    return state.paginationState.paginator.pageSize;
  }

  @Selector()
  static getCollectionTotalSize(state: ICartManagerStateModel): number {
    return state.paginationState.items.length;
  }
  @Selector()
  static getAllPages(state: ICartManagerStateModel): ICartManagerFirebaseModel[] {
    return state.paginationState.items;
  }

  @Selector()
  static getCurrent(state: ICartManagerStateModel): ICartManagerFirebaseModel {
    return state.current;
  }

  @Selector()
  static getSelected(state: ICartManagerStateModel): ICartManagerFirebaseModel {
    return state.selected;
  }

  @Selector()
  static getCurrentCartSize(state: ICartManagerStateModel): number {
    return state.products.length;
  }

  ngxsOnInit(ctx: StateContext<ICartManagerStateModel>) {
    ctx.dispatch(new CartManagerLoadProductsFromStorageAction());
  }


  @Action(CartManagerSetAsDoneAction)
  onDone(ctx: StateContext<ICartManagerStateModel>) {
    ctx.patchState({
      loading: false
    });
  }
  @Action(CartManagerSetAsLoadingAction)
  onLoading(ctx: StateContext<ICartManagerStateModel>) {
    ctx.patchState({
      loading: true
    });
  }

  @Action(CartManagerLoadProductsFromStorageAction)
  onLoadFromStore(ctx: StateContext<ICartManagerStateModel>) {
    const stored = this.document.defaultView.FromLocalStorage<ICartStorageModel>(CART_STORAGE);
    if (stored?.products.length) {
      ctx.patchState({ products: stored.products });
    }
  }

  @Action(CartManagerAddProductAction)
  onAddProductToCart(ctx: StateContext<ICartManagerStateModel>, action: CartManagerAddProductAction) {
    const { products } = ctx.getState();
    const cart = <ICartStorageModel>{ updated: Date.now(), products: [...products, action.product] };
    this.document.defaultView.IntoLocalStorage(CART_STORAGE, cart);
    ctx.patchState({ products: cart.products });
    this.snackBarStatus.OpenComplete('Product added to Cart');
  }

  @Action(CartManagerCreateAction)
  onCreate(ctx: StateContext<ICartManagerStateModel>, action: CartManagerCreateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ createDate: now, updatedDate: now, updatedBy: user, createdBy: user }
        const form = { ...action.request, ...metadata };
        return from(this.schemas.create(form))
      }),
      tap(() => {
        this.snackBarStatus.OpenComplete('Cart Manager Succesfully Created');
        ctx.dispatch(new Navigate(['admin/CartManager']));
      })
    );
  }

  @Action(CartManagerUpdateAction)
  onUpdateAction(ctx: StateContext<ICartManagerStateModel>, action: CartManagerUpdateAction) {
    return this.store.selectOnce(AuthState.getUser).pipe(
      mergeMap((user) => {
        const now = Date.now();
        const metadata = <Partial<IFireBaseEntity>>{ updatedDate: now, updatedBy: user }
        const form = { ...action.request, ...metadata };
        return this.schemas.update(action.request.Id, form);
      }),
      delay(1000),
      tap(() => {
        this.snackBarStatus.OpenComplete('Cart Manager Updated Succesfully');
        ctx.dispatch(new Navigate(['admin/CartManager']));
      })
    );
  }

  @Action(CartManagerLoadItemsAction)
  onLoadItems(ctx: StateContext<ICartManagerStateModel>) {
    const { paginationState } = ctx.getState();
    const { orderByField, paginator } = paginationState;
    if (!this.subscription) {
      ctx.dispatch(new CartManagerSetAsLoadingAction());
      this.subscription = this.schemas.collection$(ref => ref.orderBy(orderByField, 'desc')).pipe(
        tap(items => {
          const newPaginationState = { ...paginationState, items };
          ctx.patchState({ paginationState: newPaginationState });
        }),
        mergeMap(() => ctx.dispatch(new CartManagerSetPaginatorAction({ ...paginator }))),
        mergeMap(() => ctx.dispatch(new CartManagerSetAsDoneAction()))
      ).subscribe();
    }
  }

  @Action(CartManagerSetPaginatorAction)
  onSetPaginate(ctx: StateContext<ICartManagerStateModel>, action: CartManagerSetPaginatorAction) {
    let { paginationState } = ctx.getState();
    let { paginator } = action;

    paginationState = { ...paginationState, paginator };
    ctx.patchState({ paginationState });
    return ctx.dispatch(new CartManagerPaginateItemsAction());
  }

  @Action(CartManagerPaginateItemsAction)
  onPaginate(ctx: StateContext<ICartManagerStateModel>) {
    let { paginationState } = ctx.getState();
    let { paginator } = paginationState;
    let items = [...paginationState.items];
    const page = items.splice(paginator.pageIndex * paginator.pageSize, paginator.pageSize);

    paginationState = { ...paginationState, page };
    ctx.patchState({ paginationState });
  }

  @Action(CartManagerRemoveAction)
  onRemove(ctx: StateContext<ICartManagerStateModel>, action: CartManagerRemoveAction) {
    const { Id } = action.request;
    return this.confirmationDialog.OnConfirm('Are you sure you would like to delete this Cart Manager?').pipe(
      mergeMap(() => from(this.schemas.delete(Id))),
      tap(() => this.snackBarStatus.OpenComplete('Cart Manager has been Removed')),
    )
  }

  @Action(CartManagerGetByIdAction)
  onGetById(ctx: StateContext<ICartManagerStateModel>, action: CartManagerGetByIdAction) {
    const { id: currentId } = action;
    ctx.dispatch(new CartManagerSetAsLoadingAction());
    return from(this.schemas.queryCollection(ref => ref.where('Id', '==', currentId)).get()).pipe(
      tap(records => {
        if (records?.docs.length) {
          const current = records.docs[0].data() as ICartManagerFirebaseModel;
          ctx.patchState({ currentId, current });
        }
      }),
      delay(1000),
      mergeMap(() => ctx.dispatch(new CartManagerSetAsDoneAction()))
    )
  }


}
