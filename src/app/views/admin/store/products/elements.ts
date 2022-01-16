import { AdminStoreProductComponent } from "./admin-store-product.component";
import { AdminStoreProductListComponent } from "./list/admin-store-product-list.component";

import { AdminStoreProductListResolver } from "./list/admin-store-product-list.resolver";

export function getComponents() {
  return [
    AdminStoreProductComponent,
    AdminStoreProductListComponent
  ]
}

export function getProviders() {
  return [
    AdminStoreProductListResolver
  ]
}
