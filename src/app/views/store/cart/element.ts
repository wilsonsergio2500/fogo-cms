import { StoreCartItemsComponent } from "./items/store-cart-items.component";
import { StoreCartComponent } from "./store-cart.component";

import { StoreCartItemsResolver } from "./items/store-cart-items.resolver";


export function getComponents() {
  return [
    StoreCartComponent,
    StoreCartItemsComponent
  ]
}

export function getProviders() {
  return [
    StoreCartItemsResolver
  ]
}
