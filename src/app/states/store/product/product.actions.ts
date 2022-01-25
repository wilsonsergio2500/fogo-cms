
import { IPaginator } from '@firebase-module/types/firebase-pagination-inmemory';
import { IProductFirebaseModel } from './schema/product.schema';

export type OrderByFieldType = "createDate" | "rank";

export class ProductSetAsLoadingAction {
  static type = '[Product] Set As Loading';
}

export class ProductSetAsDoneAction {
  static type = '[Product] Set As Done';
}

export class ProductCreateAction {
  static type = '[Product] Create';
  constructor(public request: IProductFirebaseModel) { }
}

export class ProductSetOrderByFieldAction {
  static type = '[Product] Set Order By Field';
  constructor(public orderByField: OrderByFieldType) { }
}

export class ProductUpdateAction {
  static type = '[Product] Update';
  constructor(public request: IProductFirebaseModel) { }
}

export class ProductRemoveAction {
  static type = '[Product] Remove';
  constructor(public request: IProductFirebaseModel) { }
}

export class ProductGetByIdAction {
  static type = '[Product] Get By Id';
  constructor(public id: string) { }
}

export class ProductLoadAction {
  static type = '[Product] Load';
}

export class ProductLoadFirstPageAction {
  static type = '[Product] Load First Page';
}

export class ProductLoadNextPageAction {
  static type = '[Product] Load Next Page';
}

export class ProductLoadPreviousPageAction {
  static type = '[Product] Load Previous Page';
}

