import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ICheckoutAddressForm } from './checkout-address-form.form';
import { FormlyTypeGroup } from '@formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '@formly-fields-extended/base/fields-types-schemas';

@Component({
  selector: 'checkout-address-form',
  templateUrl: 'checkout-address-form.component.html',
})
export class CheckoutAddressFormComponent implements OnInit {

  @Output() next = new EventEmitter<ICheckoutAddressForm>();
  formlyGroup: FormlyTypeGroup<ICheckoutAddressForm>;
  btnReadyLabel = 'Next';

  ngOnInit() {
    this.formlyGroup = new FormlyTypeGroup<ICheckoutAddressForm>({
      address: new FieldTypes.InputField('Address', true, 80),
      city: new FieldTypes.InputField('City', true, 20),
      state: new FieldTypes.PickStateField('State', true, 80),
      zipcode: new FieldTypes.InputField('Zipcode', true, 20)
    })
  }

  submit() {
    this.next.emit(this.formlyGroup.model);
  }

}
