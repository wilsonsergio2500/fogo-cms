import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormlyTypeGroup } from '@formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '@formly-fields-extended/base/fields-types-schemas';
import { ICheckoutGeneralForm } from './checkout-personal-form.form';

@Component({
  selector: 'checkout-personal-form',
  templateUrl: 'checkout-personal-form.component.html',
  exportAs: 'personalForm'
})
export class CheckoutPersonalFormComponent implements OnInit {

  @Output() next = new EventEmitter<ICheckoutGeneralForm>();
  formlyGroup: FormlyTypeGroup<ICheckoutGeneralForm>;
  btnReadyLabel = 'Next';

  ngOnInit() {
    this.formlyGroup = new FormlyTypeGroup<ICheckoutGeneralForm>({
      name: new FieldTypes.InputField('First Name', true, 50),
      lastname: new FieldTypes.InputField('Last Name', true, 50),
      email: new FieldTypes.EmailField('Email', true, 100)
    })
  }

  submit() {
    this.next.emit(this.formlyGroup.model);
  }
}
