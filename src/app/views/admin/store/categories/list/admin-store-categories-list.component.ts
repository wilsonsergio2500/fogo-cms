import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreCategoryState } from '@states/store/category/category.state';
import { ICategoryFirebaseModel } from '@states/store/category/schema/category.schema';
import { CategoryRemoveAction, CategorySetPaginatorAction } from '@states/store/category/category.actions';


@Component({
  selector: 'admin-store-categories-list',
  templateUrl: 'admin-store-categories-list.component.html',
  styleUrls: [`admin-store-categories-list.component.scss`]
})
export class AdminStoreCategoriesListComponent {

  @Select(StoreCategoryState.IsLoading) working$: Observable<boolean>;
  @Select(StoreCategoryState.getCurrentPage) records$: Observable<ICategoryFirebaseModel[]>;
  @Select(StoreCategoryState.getCollectionTotalSize) totalSize$: Observable<number>;
  @Select(StoreCategoryState.getPageSize) pageSize$: Observable<number>;
  @Select(StoreCategoryState.getPageIndex) pageIndex$: Observable<number>;

  constructor(private store: Store) { }

  onPageEvent($event) {
    this.store.dispatch(new CategorySetPaginatorAction($event));
  }

  onRemove(row) {
    this.store.dispatch(new CategoryRemoveAction(row))
  }

}
