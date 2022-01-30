import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreProductState } from '@states/store/product/product.state';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';

@Component({
    selector: 'store-product',
    templateUrl: 'store-product.component.html',
    styleUrls: [`store-product.component.scss`]
  })
  export class StoreProductComponent {
   
  @Select(StoreProductState.IsLoading) working$: Observable<boolean>;
  @Select(StoreProductState.getCurrent) current$: Observable<IProductFirebaseModel>

    constructor(private store: Store) {}
  
  
  } 
