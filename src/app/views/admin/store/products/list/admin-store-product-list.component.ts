import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreProductState } from '@states/store/product/product.state';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';
import { ProductLoadNextPageAction, ProductLoadPreviousPageAction, ProductRemoveAction } from '@states/store/product/product.actions';

@Component({
  selector: 'admin-store-product-list',
  templateUrl: 'admin-store-product-list.component.html',
  styleUrls: [`admin-store-product-list.component.scss`]
})
export class AdminStoreProductListComponent {

  @Select(StoreProductState.IsLoading) working$: Observable<boolean>;
  @Select(StoreProductState.getPage) records$: Observable<IProductFirebaseModel[]>;
  @Select(StoreProductState.getNextEnabled) next$: Observable<boolean>;
  @Select(StoreProductState.getPreviousEnabled) prev$: Observable<boolean>;
  @Select(StoreProductState.IsPaginatorEnabled) paginationEnabled$: Observable<boolean>;

  constructor(private store: Store) { }

  onNextPage() {
    this.store.dispatch(new ProductLoadNextPageAction())
  }

  onPrevPage() {
    this.store.dispatch(new ProductLoadPreviousPageAction());
  }

  onRemove(row: IProductFirebaseModel) {
    this.store.dispatch(new ProductRemoveAction(row));
  }

}
