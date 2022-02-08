import { Component, Input } from '@angular/core';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';

@Component({
    selector: 'cart-product-list',
    templateUrl: 'cart-product-list.component.html',
    styleUrls: [`cart-product-list.component.scss`]
  })
  export class CartProductListComponent {

  @Input() cartSize: number = 0;
  @Input() products: IProductFirebaseModel[];
  @Input() cartTotal: number = 0;
  
  } 
