import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';

@Component({
  selector: 'product-preview',
  templateUrl: 'product-preview.component.html',
  styleUrls: [`product-preview.component.scss`]
})
export class ProductPreviewComponent {

  @Input() product: IProductFirebaseModel;
  @Output() onAddToCart = new EventEmitter<IProductFirebaseModel>();

  addToCart() {
    this.onAddToCart.emit(this.product);
  }

}
