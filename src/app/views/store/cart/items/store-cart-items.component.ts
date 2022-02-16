import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreCartManagerState } from '@states/store/cart/cart-manager.state';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';
import { CartManagerEmptyCartAction, CartManagerRemoveProductAction } from '@states/store/cart/cart-manager.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'store-cart-items',
  templateUrl: 'store-cart-items.component.html',
  styleUrls: [`store-cart-items.component.scss`]
})
export class StoreCartItemsComponent {

  @Select(StoreCartManagerState.getCartProducts) products$: Observable<IProductFirebaseModel[]>;
  @Select(StoreCartManagerState.getCurrentCartSize) cartSize$: Observable<number>;
  @Select(StoreCartManagerState.getCartTotal) cartTotal$: Observable<number>;

  constructor(private store: Store) { }

  removeFromCart(product: IProductFirebaseModel) {
    this.store.dispatch(new CartManagerRemoveProductAction(product));
  }

  onEmptyCart() {
    this.store.dispatch(new CartManagerEmptyCartAction())
  }
  onCheckout() {
    this.store.dispatch(new Navigate(['store', 'cart', 'checkout']));
  }
}
