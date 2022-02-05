import { Component, Input } from '@angular/core';

@Component({
  selector: 'cart-counter',
  templateUrl: 'cart-counter.component.html',
  styleUrls: [`cart-counter.component.scss`]
})
export class CartCounterComponent {

  @Input() cartSize: number = 0;

  get hasCartSize() {
    return !!!this.cartSize;
  }
}
