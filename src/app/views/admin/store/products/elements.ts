import { AdminStoreProductComponent } from "./admin-store-product.component";
import { AdminStoreProductCreateComponent } from "./create/admin-store-product-create.component";
import { AdminStoreProductListComponent } from "./list/admin-store-product-list.component";

import { AdminStoreProductListResolver } from "./list/admin-store-product-list.resolver";
import { AdminStoreProductCreateResolver } from "./create/admin-store-product-create.resolver";


export function getComponents() {
  return [
    AdminStoreProductComponent,
    AdminStoreProductListComponent,
    AdminStoreProductCreateComponent
  ]
}

export function getProviders() {
  return [
    AdminStoreProductListResolver,
    AdminStoreProductCreateResolver
  ]
}
