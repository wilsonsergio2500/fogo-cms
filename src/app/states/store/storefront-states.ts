import { StoreCategoryState } from "./category/category.state";
import { StoreProductState } from "./product/product.state";

export function getStoreFrontStates() {
  return [
    StoreCategoryState,
    StoreProductState
  ]
}
