import { CheckoutAddressFormComponent } from "./address/checkout-address-form.component";
import { CheckoutPersonalFormComponent } from "./personal/checkout-personal-form.component";

export function getCheckoutFormComponents() {
  return [
    CheckoutAddressFormComponent,
    CheckoutPersonalFormComponent
  ];
}
