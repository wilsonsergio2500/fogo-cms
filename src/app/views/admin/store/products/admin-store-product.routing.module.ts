import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { AdminStoreProductComponent } from './admin-store-product.component';
import { AdminStoreProductListComponent } from './list/admin-store-product-list.component';
import { AdminStoreProductListResolver } from './list/admin-store-product-list.resolver';

const routes: Routes = [
  <Route>{
    path: '', component: AdminStoreProductComponent, children: [
      <Route>{ path: '', component: AdminStoreProductListComponent, resolve: { action: AdminStoreProductListResolver } },
      <Route>{ path: 'list', component: AdminStoreProductListComponent, resolve: { action: AdminStoreProductListResolver } },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStoreProductRoutingModule {}
