import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreCategoryState } from '@states/store/category/category.state';
import { ICategoryFirebaseModel } from '@states/store/category/schema/category.schema';

@Component({
  selector: 'store-categories',
  templateUrl: 'store-categories.component.html',
  styleUrls: [`store-categories.component.scss`]
})
export class StoreCategoriesComponent {

  @Select(StoreCategoryState.IsLoading) working$: Observable<boolean>;
  @Select(StoreCategoryState.getItems) items$: Observable<ICategoryFirebaseModel>;

  constructor(private store: Store) { }


}
