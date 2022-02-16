import { StoreCartItemsComponent } from "./items/store-cart-items.component";
import { StoreCartComponent } from "./store-cart.component";

import { StoreCartItemsResolver } from "./items/store-cart-items.resolver";
import { StoreCartCheckoutComponent } from "./checkout/store-cart-checkout.component";


export function getComponents() {
  return [
    StoreCartComponent,
    StoreCartItemsComponent,
    StoreCartCheckoutComponent
  ]
}

export function getProviders() {
  return [
    StoreCartItemsResolver
  ]
}
