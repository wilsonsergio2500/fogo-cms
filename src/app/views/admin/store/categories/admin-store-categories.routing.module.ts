import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { AdminStoreCategoriesComponent } from './admin-store-categories.component';
import { AdminStoreCategoriesListComponent } from './list/admin-store-categories-list.component';

const routes: Routes = [
  <Route>{
    path: '', component: AdminStoreCategoriesComponent, children: [
      <Route>{ path: '', component: AdminStoreCategoriesListComponent },
      <Route>{ path: 'categories', component: AdminStoreCategoriesListComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStoreCategoriesRoutingModule {}
