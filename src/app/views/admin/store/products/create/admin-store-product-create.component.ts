import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormlyTypeGroup } from '@formly-fields-extended/base/FormlyTypeGroup';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';
import { FieldTypes } from '@formly-fields-extended/base/fields-types-schemas';
import { StoreCategoryState } from '@states/store/category/category.state';
import { map } from 'rxjs/operators';
import { ProductCreateAction } from '@states/store/product/product.actions';

@Component({
  selector: 'admin-store-product-create',
  templateUrl: 'admin-store-product-create.component.html',
  styleUrls: [`admin-store-product-create.component.scss`]
})
export class AdminStoreProductCreateComponent implements OnInit {

  formlyGroup: FormlyTypeGroup<IProductFirebaseModel>;
  listPath = "/admin/store/products";
  title = 'Products';
  btnReadyLabel = 'Create';
  btnLoadingLabel = 'Creating...';

  constructor(private store: Store) { }

  ngOnInit() {

    const greaterThanZero = {
      expression: ({ value }) => {
        return !(value == 0);
      },
      message: (error, field) => {
        return `${field.templateOptions.label} mus be Greather Than $0`;
      }
    }

    const LessThanSalesPrice = {
      expression: ({ value: originalPrice }, { model }) => {
        const { price, deal } = model as IProductFirebaseModel;
        return (deal) ? (originalPrice > price) : true;
      },
      message: (error, field) => {
        return `${field.templateOptions.label} mus be greater than sales Price (For Deals)`;
      }
    }

    const categoryList$ = this.store.select(StoreCategoryState.getItems).pipe(map(el => el.map(k => ({ label: k.name, value: k.name }))));

    this.formlyGroup = new FormlyTypeGroup<IProductFirebaseModel>({
      name: new FieldTypes.InputField('Name', true, 60, { templateOptions: { fxFlexXs: 60 } }),
      publish: new FieldTypes.ToogleField('Publish', 40, { templateOptions: { fxFlexXs: 40 } }),
      image: new FieldTypes.FirebaseImageGalleryUploader('Image', true, 100),
      excerpt: new FieldTypes.MatEditor('Excerpt', false, 100, { placeholder: 'Insert excerpt for SEO here...', hasSideBar: false }),
      description: new FieldTypes.MatEditor('Description', true, 100, { placeholder: 'Insert product description here...', hasSideBar: false }),
      price: new FieldTypes.NumberField('Price', true, 50, { validators: { greaterThanZero }, templateOptions: { fxFlexXs: 50 } }),
      quantity: new FieldTypes.NumberField('Quantity', true, 50, { templateOptions: { fxFlexXs: 50 } }),
      deal: new FieldTypes.ToogleField('Deal', 100),
      originalPrice: new FieldTypes.NumberField('Original Price', false, 100, {
        validators: { greaterThanZero, LessThanSalesPrice },
        expressionProperties: {
          'className': (model: IProductFirebaseModel) => {
            return (!!!model.deal) ? 'hide-me' : '';
          },
          'templateOptions.required': (model: IProductFirebaseModel) => {
            return !!model.deal;
          }
        }
      }),
      category: new FieldTypes.SelectField('Category', true, 100, categoryList$),
      rank: new FieldTypes.Slidder('Rank', 1, 10, 1, 100, { templateOptions: { thumbLabel: true } }),
      about: new FieldTypes.MatEditor('Aboout', false, 100, { placeholder: 'Insert more Information about this product...' })
    });

    console.log(this.formlyGroup);
  }

  formSubmit() {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new ProductCreateAction({ ...this.formlyGroup.model }))
  }

}
