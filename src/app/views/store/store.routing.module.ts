import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { StoreCategoriesComponent } from './categories/store-categories.component';
import { StoreCategoryComponent } from './category/store-category.component';
import { StoreCategoriesResolver } from './categories/store-categories.resolver';
import { StoreDashboardComponent } from './dashboard/store-dashboard.component';
import { StoreCategoryResolver } from './category/store-category.resolver';
import { StoreProductComponent } from './product/store-product.component';
import { StoreProductResolver } from './product/store-product.resolver';

const routes: Routes = [
    <Route>{ path: '', component:  StoreComponent, children: [
      <Route>{ path: '', component: StoreDashboardComponent },
      <Route>{ path: 'categories', component: StoreCategoriesComponent, resolve: { action: StoreCategoriesResolver } },
      <Route>{ path: 'category/:category', component: StoreCategoryComponent, resolve: { action: StoreCategoryResolver } },
      <Route>{ path: 'cart', loadChildren: () => import('./cart/store-cart.module').then(m => m.StoreCartModule)},
      <Route>{ path: 'product/:id', component: StoreProductComponent, resolve: { action: StoreProductResolver } }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
