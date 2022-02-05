import { StoreCategoryState } from "./category/category.state";
import { StoreProductState } from "./product/product.state";
import { StoreProductListingState } from "./listing/listing.state";
import { StoreCartManagerState } from "./cart/cart-manager.state";


export function getStoreFrontStates() {
  return [
    StoreCategoryState,
    StoreProductState,
    StoreProductListingState,
    StoreCartManagerState
  ]
}
