import { AdminStoreCategoriesComponent } from "./admin-store-categories.component";
import { AdminStoreCategoriesListComponent } from "./list/admin-store-categories-list.component";
import { AdminStoreCategoriesCreateComponent } from "./create/admin-store-categories-create.component";
import { AdminStoreCategoriesEditComponent } from "./edit/admin-store-categories-edit.component";


import { AdminStoreCategoriesListResolver } from "./list/admin-store-categories-list.resolver";
import { AdminStoreCategoriesCreateResolver } from "./create/admin-store-categories-create.resolver";
import { AdminStoreCategoriesEditResolver } from "./edit/admin-store-categories-edit.resolver";

export function getComponents() {
  return [
    AdminStoreCategoriesComponent,
    AdminStoreCategoriesListComponent,
    AdminStoreCategoriesCreateComponent,
    AdminStoreCategoriesEditComponent
  ]
}

export function getProviders() {
  return [
    AdminStoreCategoriesListResolver,
    AdminStoreCategoriesCreateResolver,
    AdminStoreCategoriesEditResolver
  ]
}
