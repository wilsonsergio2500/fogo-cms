
import { IPaginator } from '@firebase-module/types/firebase-pagination-inmemory';
import { ICartManagerFirebaseModel } from './schema/cart-manager.schema';
import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';


export class CartManagerSetAsLoadingAction {
    static type = '[Cart Manager] Set As Loading';
  }
  
  export class CartManagerSetAsDoneAction {
    static type = '[Cart Manager] Set As Done';
  }

  export class CartManagerCreateAction{
    static type = '[Cart Manager] Create';
    constructor(public request: ICartManagerFirebaseModel) { }
  }

  export class CartManagerUpdateAction{
    static type = '[Cart Manager] Update';
    constructor(public request: ICartManagerFirebaseModel) { }
  }

  export class CartManagerLoadItemsAction{
    static type = '[Cart Manager] Load Items';
  }

export class CartManagerSetPaginatorAction {
    static type = '[Cart Manager] Set Paginator';
    constructor(public paginator: IPaginator) {}
}

export class CartManagerPaginateItemsAction {
  static type = '[Cart Manager] Paginate Items';
}

export class CartManagerRemoveAction{
  static type = '[Cart Manager] Remove';
  constructor(public request: ICartManagerFirebaseModel) { }
}

export class CartManagerGetByIdAction{
  static type = '[Cart Manager] Get By Id';
  constructor(public id: string) { }
}

export class CartManagerAddProductAction {
  static type = '[Cart Manager] Add Product To Cart';
  constructor(public product: IProductFirebaseModel) { }
}

export class CartManagerLoadProductsFromStorageAction {
  static type = '[Cart Manager] Load From LocalStore';
}
