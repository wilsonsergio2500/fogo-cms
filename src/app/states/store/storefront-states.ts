import { StoreCategoryState } from "./category/category.state";
import { StoreProductState } from "./product/product.state";
import { StoreCategoryProductState } from "./category-product/category-product.state";
import { StoreProductListingState } from "./listing/listing.state";


export function getStoreFrontStates() {
  return [
    StoreCategoryState,
    StoreProductState,
    StoreCategoryProductState,
    StoreProductListingState
  ]
}
