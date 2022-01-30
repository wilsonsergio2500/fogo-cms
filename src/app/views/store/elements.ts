import { StoreComponent } from "./store.component";
import { StoreCategoriesComponent } from "./categories/store-categories.component";
import { StoreDashboardComponent } from "./dashboard/store-dashboard.component";
import { StoreCategoryComponent } from "./category/store-category.component";
import { StoreProductComponent } from "./product/store-product.component";


import { StoreCategoriesResolver } from "./categories/store-categories.resolver";
import { StoreCategoryResolver } from "./category/store-category.resolver";
import { StoreProductResolver } from "./product/store-product.resolver";

export function getComponents() {
  return [
    StoreComponent,
    StoreDashboardComponent,
    StoreCategoriesComponent,
    StoreCategoryComponent,
    StoreProductComponent
  ]
}

export function getProviders() {
  return [
    StoreCategoriesResolver,
    StoreCategoryResolver,
    StoreProductResolver
  ]
}
