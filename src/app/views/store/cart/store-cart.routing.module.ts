import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { StoreCartCheckoutComponent } from './checkout/store-cart-checkout.component';
import { StoreCartItemsComponent } from './items/store-cart-items.component';
import { StoreCartItemsResolver } from './items/store-cart-items.resolver';
import { StoreCartComponent } from './store-cart.component';

const routes: Routes = [
  <Route>{
    path: '', component: StoreCartComponent, children: [
      <Route>{ path: '', component: StoreCartItemsComponent, resolve: { action: StoreCartItemsResolver } },
      <Route>{ path: 'items', component: StoreCartItemsComponent, resolve: { action: StoreCartItemsResolver } },
      <Route>{ path: 'checkout', component: StoreCartCheckoutComponent}
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreCartRoutingModule {}
