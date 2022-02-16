import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';

export class CartManagerSetAsLoadingAction {
  static type = '[Cart Manager] Set As Loading';
}

export class CartManagerSetAsDoneAction {
  static type = '[Cart Manager] Set As Done';
}

export class CartManagerAddProductAction {
  static type = '[Cart Manager] Add Product To Cart';
  constructor(public product: IProductFirebaseModel) { }
}

export class CartManagerRemoveProductAction {
  static type = '[Cart Manager] Remove Product From Cart';
  constructor(public product: IProductFirebaseModel) { }
}

export class CartManagerEmptyCartAction {
  static type = '[Cart Manager] Empty Cart';
}

export class CartManagerLoadProductsFromStorageAction {
  static type = '[Cart Manager] Load From LocalStore';
}
