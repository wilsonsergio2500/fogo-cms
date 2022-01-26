import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { StoreCategoriesComponent } from './categories/store-categories.component';
import { StoreCategoryComponent } from './category/store-category.component';
import { StoreCategoriesResolver } from './categories/store-categories.resolver';
import { StoreDashboardComponent } from './dashboard/store-dashboard.component';
import { StoreComponent } from './store.component';
import { StoreCategoryResolver } from './category/store-category.resolver';

const routes: Routes = [
    <Route>{ path: '', component:  StoreComponent, children: [
      <Route>{ path: '', component: StoreDashboardComponent },
      <Route>{ path: 'categories', component: StoreCategoriesComponent, resolve: { action: StoreCategoriesResolver } },
      <Route>{ path: 'category/:category', component: StoreCategoryComponent, resolve: { action: StoreCategoryResolver}}
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
