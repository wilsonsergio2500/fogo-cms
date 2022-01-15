import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { AdminStoreCategoriesComponent } from './admin-store-categories.component';
import { AdminStoreCategoriesCreateComponent } from './create/admin-store-categories-create.component';
import { AdminStoreCategoriesListComponent } from './list/admin-store-categories-list.component';
import { AdminStoreCategoriesListResolver } from './list/admin-store-categories-list.resolver';
import { AdminStoreCategoriesCreateResolver } from './create/admin-store-categories-create.resolver';
import { AdminStoreCategoriesEditComponent } from './edit/admin-store-categories-edit.component';
import { AdminStoreCategoriesEditResolver } from './edit/admin-store-categories-edit.resolver';

const routes: Routes = [
  <Route>{
    path: '', component: AdminStoreCategoriesComponent, children: [
      <Route>{ path: '', component: AdminStoreCategoriesListComponent, resolve: { action: AdminStoreCategoriesListResolver } },
      <Route>{ path: 'list', component: AdminStoreCategoriesListComponent, resolve: { action: AdminStoreCategoriesListResolver} },
      <Route>{ path: 'create', component: AdminStoreCategoriesCreateComponent, resolve: { action: AdminStoreCategoriesCreateResolver } },
      <Route>{ path: 'edit/:id', component: AdminStoreCategoriesEditComponent, resolve: { action: AdminStoreCategoriesEditResolver } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStoreCategoriesRoutingModule { }
