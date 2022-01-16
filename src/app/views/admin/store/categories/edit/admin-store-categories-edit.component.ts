import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { StoreCategoryState } from '@states/store/category/category.state';
import { ICategoryFirebaseModel } from '@states/store/category/schema/category.schema';
import { FormlyTypeGroup } from '@formly-fields-extended/base/FormlyTypeGroup';
import { FieldTypes } from '@formly-fields-extended/base/fields-types-schemas';
import { filter, tap } from 'rxjs/operators';
import { CategoryUpdateAction } from '@states/store/category/category.actions';

@Component({
  selector: 'admin-store-categories-edit',
  templateUrl: 'admin-store-categories-edit.component.html',
  styleUrls: [`admin-store-categories-edit.component.scss`]
})
export class AdminStoreCategoriesEditComponent implements OnInit, OnDestroy {

  @Select(StoreCategoryState.IsLoading) working$: Observable<boolean>;
  @Select(StoreCategoryState.getCurrent) record$: Observable<ICategoryFirebaseModel>;
  formlyGroup: FormlyTypeGroup<ICategoryFirebaseModel>;
  title = 'Categories';
  btnReadyLabel = 'Update';
  btnLoadingLabel = 'Updating...';
  listPath = "/admin/store/categories";
  subscriptions: Subscription[] = [];

  constructor(private store: Store) { }

  ngOnInit() {
    this.formlyGroup = new FormlyTypeGroup<ICategoryFirebaseModel>({
      name: new FieldTypes.InputField('Name', true),
      image: new FieldTypes.FirebaseImageGalleryUploader('Image', true, 100),
      excerpt: new FieldTypes.MatEditor('Excerpt', true, 100, { placeholder: 'Insert excerpt or description...', hasSideBar: false }),
      rank: new FieldTypes.Slidder('Rank', 1, 10, 1, 100, { templateOptions: { thumbLabel: true  } })
    });

    const value$ = this.record$.pipe(
      filter(_ => !!_),
      tap(({ Id, name, image, excerpt, rank }) => {
        this.formlyGroup.setModel({ Id, name, image, excerpt, rank })
      })
    );

    this.subscriptions = [...this.subscriptions, value$.subscribe()];

  }

  formSubmit() {
    this.formlyGroup.markAsBusy();
    this.store.dispatch(new CategoryUpdateAction({ ...this.formlyGroup.model }));
  }


  ngOnDestroy() {
    if (this.subscriptions?.length) {
      this.subscriptions.forEach(s => s.unsubscribe());
    }
  }

}
