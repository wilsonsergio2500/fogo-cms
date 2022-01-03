import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { StoreDashboardComponent } from './dashboard/store-dashboard.component';
import { StoreComponent } from './store.component';

const routes: Routes = [
    <Route>{ path: '', component:  StoreComponent, children: [
        <Route>{ path: '', component: StoreDashboardComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {}
