import { AdminStoreProductComponent } from "./admin-store-product.component";
import { AdminStoreProductCreateComponent } from "./create/admin-store-product-create.component";
import { AdminStoreProductListComponent } from "./list/admin-store-product-list.component";
import { AdminStoreProductEditComponent } from "./edit/admin-store-product-edit.component";


import { AdminStoreProductListResolver } from "./list/admin-store-product-list.resolver";
import { AdminStoreProductCreateResolver } from "./create/admin-store-product-create.resolver";
import { AdminStoreProductEditResolver } from "./edit/admin-store-product-edit.resolver";


export function getComponents() {
  return [
    AdminStoreProductComponent,
    AdminStoreProductListComponent,
    AdminStoreProductCreateComponent,
    AdminStoreProductEditComponent
  ]
}

export function getProviders() {
  return [
    AdminStoreProductListResolver,
    AdminStoreProductCreateResolver,
    AdminStoreProductEditResolver
  ]
}
