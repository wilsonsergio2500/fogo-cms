import { AdminStoreCategoriesComponent } from "./admin-store-categories.component";
import { AdminStoreCategoriesListComponent } from "./list/admin-store-categories-list.component";
import { AdminStoreCategoriesCreateComponent } from "./create/admin-store-categories-create.component";

import { AdminStoreCategoriesListResolver } from "./list/admin-store-categories-list.resolver";
import { AdminStoreCategoriesCreateResolver } from "./create/admin-store-categories-create.resolver";

export function getComponents() {
  return [
    AdminStoreCategoriesComponent,
    AdminStoreCategoriesListComponent,
    AdminStoreCategoriesCreateComponent
  ]
}

export function getProviders() {
  return [
    AdminStoreCategoriesListResolver,
    AdminStoreCategoriesCreateResolver
  ]
}
