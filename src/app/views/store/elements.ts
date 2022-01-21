import { StoreComponent } from "./store.component";
import { StoreCategoriesComponent } from "./categories/store-categories.component";
import { StoreDashboardComponent } from "./dashboard/store-dashboard.component";

import { StoreCategoriesResolver } from "./categories/store-categories.resolver";

export function getComponents() {
  return [
    StoreComponent,
    StoreDashboardComponent,
    StoreCategoriesComponent
  ]
}

export function getProviders() {
  return [
    StoreCategoriesResolver
  ]
}
