import { Component, } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Select, Store } from '@ngxs/store';
import { StoreCartManagerState } from '@states/store/cart/cart-manager.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'store-cart-checkout',
  templateUrl: 'store-cart-checkout.component.html',
  styleUrls: [`store-cart-checkout.component.scss`]
})
export class StoreCartCheckoutComponent {

  @Select(StoreCartManagerState.getCartTotal) cartTotal$: Observable<number>;

  constructor(private store: Store) { }

  onGeneral(form, stepper : MatStepper) {
    stepper.next();
  }
  onAddress(form, stepper: MatStepper) {

  }

}
