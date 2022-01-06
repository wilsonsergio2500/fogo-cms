import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { AdminStoreComponent } from './admin-store.component';
import { AdminStoreImagesComponent } from './images/admin-store-images.component';
import { AdminStoreImagesResolver } from './images/admin-store-images.resolver';

const routes: Routes = [
  <Route>{
    path: '', component: AdminStoreComponent, children: [
      <Route>{ path: 'images', component: AdminStoreImagesComponent, resolve: { action: AdminStoreImagesResolver} }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStoreRoutingModule { }
