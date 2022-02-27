import { StoreCartItemsComponent } from "./items/store-cart-items.component";
import { StoreCartComponent } from "./store-cart.component";

import { StoreCartItemsResolver } from "./items/store-cart-items.resolver";
import { StoreCartCheckoutComponent } from "./checkout/store-cart-checkout.component";
import { getCheckoutFormComponents } from "./checkout/forms/element";


export function getComponents() {
  return [
    StoreCartComponent,
    StoreCartItemsComponent,
    StoreCartCheckoutComponent,
    ...getCheckoutFormComponents()
  ]
}

export function getProviders() {
  return [
    StoreCartItemsResolver
  ]
}
