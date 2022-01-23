import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormlyTypeGroup } from '@formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '@formly-fields-extended/base/fields-types-schemas';
import { ICategoryFirebaseModel } from '@states/store/category/schema/category.schema';
import { CategoryCreateAction } from '@states/store/category/category.actions';

@Component({
  selector: 'admin-store-categories-create',
  templateUrl: 'admin-store-categories-create.component.html',
  styleUrls: [`admin-store-categories-create.component.scss`]
})
export class AdminStoreCategoriesCreateComponent implements OnInit {

  formlyGroup: FormlyTypeGroup<ICategoryFirebaseModel>;
  title = 'Categories';
  btnReadyLabel = 'Add';
  btnLoadingLabel = 'Adding...';
  listPath = "/admin/store/categories";


  constructor(private store: Store) { }

  ngOnInit() {

    this.formlyGroup = new FormlyTypeGroup<ICategoryFirebaseModel>({
      name: new FieldTypes.InputField('Name', true),
      image: new FieldTypes.FirebaseImageGalleryUploader('Image', true, 100),
      excerpt: new FieldTypes.MatEditor('Excerpt', true, 100, { placeholder: 'Insert excerpt or description...', hasSideBar: false }),
      rank: new FieldTypes.Slidder('Rank', 1, 10, 1, 100, { templateOptions: { thumbLabel: true } })
    });

    this.formlyGroup.patchValue({ rank: 1 });

  }

  formSubmit() {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new CategoryCreateAction({ ...this.formlyGroup.model }))
  }


}
