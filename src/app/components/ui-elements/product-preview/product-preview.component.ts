import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';

export type ProductPreviewDisplayModeTypes = "Add" | "Remove";
export const ProductPreviewDisplayModes: { [key in ProductPreviewDisplayModeTypes]: ProductPreviewDisplayModeTypes } = { Add: "Add", Remove: "Remove" };

@Component({
  selector: 'product-preview',
  templateUrl: 'product-preview.component.html',
  styleUrls: [`product-preview.component.scss`]
})
export class ProductPreviewComponent {

  @Input() product: IProductFirebaseModel;
  @Input() mode: ProductPreviewDisplayModeTypes = ProductPreviewDisplayModes.Add;
  @Output() onAddToCart = new EventEmitter<IProductFirebaseModel>();
  @Output() onRemoveFromCart = new EventEmitter<IProductFirebaseModel>();

  ActionModes = ProductPreviewDisplayModes;

  addToCart() {
    this.onAddToCart.emit(this.product);
  }
  removeFromCart() {
    this.onRemoveFromCart.emit(this.product);
  }

}
