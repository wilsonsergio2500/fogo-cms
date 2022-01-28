import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreProductListingState } from '@states/store/listing/listing.state';
import { IListingFirebaseModel } from '@states/store/listing/schema/listing.schema';

@Component({
  selector: 'store-category',
  templateUrl: 'store-category.component.html',
  styleUrls: [`store-category.component.scss`]
})
export class StoreCategoryComponent {

  @Select(StoreProductListingState.IsLoading) working$: Observable<boolean>;
  @Select(StoreProductListingState.getPage) items$: Observable<IListingFirebaseModel[]>;
  @Select(StoreProductListingState.getCurrentCategory) category$: Observable<string>;

  constructor(private store: Store) { }




}
