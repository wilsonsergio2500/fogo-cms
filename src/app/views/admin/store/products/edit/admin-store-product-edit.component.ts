import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StoreProductState } from '@states/store/product/product.state';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';
import { FormlyTypeGroup } from '@formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '@formly-fields-extended/base/fields-types-schemas';
import { StoreCategoryState } from '@states/store/category/category.state';
import { filter, map, tap } from 'rxjs/operators';
import { ProductUpdateAction } from '@states/store/product/product.actions';
import { deepCopy } from '@appUtils/deep-copy';


@Component({
  selector: 'admin-store-product-edit',
  templateUrl: 'admin-store-product-edit.component.html',
  styleUrls: [`admin-store-product-edit.component.scss`]
})
export class AdminStoreProductEditComponent implements OnInit, OnDestroy {


  @Select(StoreProductState.IsLoading) working$: Observable<boolean>;
  @Select(StoreProductState.getCurrent) record$: Observable<IProductFirebaseModel>;
  formlyGroup: FormlyTypeGroup<IProductFirebaseModel>;
  title = 'Categories';
  btnReadyLabel = 'Update';
  btnLoadingLabel = 'Updating...';
  listPath = "/admin/store/products";
  subscriptions: Subscription[] = [];

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

    const value$ = this.record$.pipe(
      filter(_ => !!_),
      tap(({ Id, name, publish, image, excerpt, description, price, quantity, deal, originalPrice, category, rank, about }) => {
        const payload = { Id, name, publish, image, excerpt, description, price, quantity, deal, originalPrice, category, rank, about };
        this.formlyGroup.patchValue(deepCopy(payload));
      })
    );

    this.subscriptions = [...this.subscriptions, value$.subscribe()];

  }

  formSubmit() {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new ProductUpdateAction({ ...this.formlyGroup.model }));
  }

  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
