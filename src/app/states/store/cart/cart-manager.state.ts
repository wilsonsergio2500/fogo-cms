import { Inject, Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { ConfirmationDialogService } from "@customComponents/ui-elements/confirmation-dialog/confirmation-dialog.service";
import { SnackbarStatusService } from '@customComponents/ui-elements/snackbar-status/service/snackbar-status.service';
import { ICartManagerStateModel, ICartStorageModel } from './cart-manager.model';
import { IProductFirebaseModel } from '../product/schema/product.schema';
import { CartManagerSetAsLoadingAction, CartManagerSetAsDoneAction, CartManagerAddProductAction, CartManagerLoadProductsFromStorageAction, CartManagerRemoveProductAction, CartManagerEmptyCartAction } from './cart-manager.actions';
import { tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import '@appUtils/local-storage-helper';

const CART_STORAGE = "cart-items";

@State<ICartManagerStateModel>({
  name: 'cartManagerState',
  defaults: <ICartManagerStateModel>{
    loading: false,
    products: []
  }
})
@Injectable()
export class StoreCartManagerState {

  constructor(
    private snackBarStatus: SnackbarStatusService,
    private confirmationDialog: ConfirmationDialogService,
    @Inject(DOCUMENT) private document: Document,

  ) {
  }

  @Selector()
  static IsLoading(state: ICartManagerStateModel): boolean {
    return state.loading;
  }
 

  @Selector()
  static getCurrentCartSize(state: ICartManagerStateModel): number {
    return state.products.length;
  }

  @Selector()
  static getCartProducts(state: ICartManagerStateModel): IProductFirebaseModel[] {
    return state.products;
  }

  @Selector()
  static getCartTotal(state: ICartManagerStateModel): number {
    const total = state.products.reduce((c, p) => c + p.price, 0);
    return total;
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
    const Indexer = (product: IProductFirebaseModel) => `${product.Id}|${Date.now()}`;
    const { products } = ctx.getState();
    const cartIndex = Indexer(action.product);
    const cart = <ICartStorageModel>{ updated: Date.now(), products: [...products, { ...action.product, cartIndex }] };
    this.document.defaultView.IntoLocalStorage(CART_STORAGE, cart);
    ctx.patchState({ products: cart.products });
    this.snackBarStatus.OpenComplete('Product added to Cart');
  }

  @Action(CartManagerRemoveProductAction)
  onRemoveProductFromCart(ctx: StateContext<ICartManagerStateModel>, action: CartManagerRemoveProductAction) {
    const { product } = action;
    const { products : items } = ctx.getState();
    return this.confirmationDialog.OnConfirm('Are you sure you would like to remove this Item from your Cart?').pipe(
      tap(() => {
        const products = items.filter(g => g.cartIndex != product.cartIndex);
        const cart = <ICartStorageModel>{ updated: Date.now(), products: [...products] };
        this.document.defaultView.IntoLocalStorage(CART_STORAGE, cart);
        ctx.patchState({ products: cart.products });
        this.snackBarStatus.OpenComplete('Product Removed From Cart');
      })
    )
  }

  @Action(CartManagerEmptyCartAction)
  onEmptyCart(ctx: StateContext<ICartManagerStateModel>, action: CartManagerEmptyCartAction) {
    return this.confirmationDialog.OnConfirm('Are you sure you would like to remove all the items from your Cart?').pipe(
      tap(() => {
        const cart = <ICartStorageModel>{ updated: Date.now(), products: [] };
        this.document.defaultView.IntoLocalStorage(CART_STORAGE, cart);
        ctx.patchState({ products: cart.products });
        this.snackBarStatus.OpenComplete('Cart has been initialized');
        ctx.dispatch(new Navigate(['store']));
      })
    )
  }


}
