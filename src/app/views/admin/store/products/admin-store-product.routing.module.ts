import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { AdminStoreProductComponent } from './admin-store-product.component';
import { AdminStoreProductCreateComponent } from './create/admin-store-product-create.component';
import { AdminStoreProductCreateResolver } from './create/admin-store-product-create.resolver';
import { AdminStoreProductEditComponent } from './edit/admin-store-product-edit.component';
import { AdminStoreProductEditResolver } from './edit/admin-store-product-edit.resolver';
import { AdminStoreProductListComponent } from './list/admin-store-product-list.component';
import { AdminStoreProductListResolver } from './list/admin-store-product-list.resolver';

const routes: Routes = [
  <Route>{
    path: '', component: AdminStoreProductComponent, children: [
      <Route>{ path: '', component: AdminStoreProductListComponent, resolve: { action: AdminStoreProductListResolver } },
      <Route>{ path: 'list', component: AdminStoreProductListComponent, resolve: { action: AdminStoreProductListResolver } },
      <Route>{ path: 'create', component: AdminStoreProductCreateComponent, resolve: { action: AdminStoreProductCreateResolver } },
      <Route>{ path: 'edit/:id', component: AdminStoreProductEditComponent, resolve: { action: AdminStoreProductEditResolver } },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStoreProductRoutingModule {}
