import { Component, Input} from '@angular/core';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';

@Component({
    selector: 'product-view',
    templateUrl: 'product-view.component.html',
    styleUrls: [`product-view.component.scss`]
  })
  export class ProductViewComponent {
   
  @Input() product: IProductFirebaseModel;
   
  
  } 
