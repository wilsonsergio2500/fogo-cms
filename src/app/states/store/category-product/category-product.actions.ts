
import { IPaginator } from '@firebase-module/types/firebase-pagination-inmemory';
import { ICategoryProductFirebaseModel } from './schema/category-product.schema';

export class CategoryProductSetAsLoadingAction {
  static type = '[Category Product] Set As Loading';
}

export class CategoryProductSetAsDoneAction {
  static type = '[Category Product] Set As Done';
}

export class CategoryProductCreateAction {
  static type = '[Category Product] Create';
  constructor(public request: ICategoryProductFirebaseModel) { }
}

export class CategoryProductLoadItemsAction {
  static type = '[Category Product] Load Items';
}

export class CategoryProductSetPaginatorAction {
  static type = '[Category Product] Set Paginator';
  constructor(public paginator: IPaginator) { }
}

export class CategoryProductPaginateItemsAction {
  static type = '[Category Product] Paginate Items';
}

export class CategoryProductRemoveAction {
  static type = '[Category Product] Remove';
  constructor(public request: ICategoryProductFirebaseModel) { }
}

export class CategoryProductGetByIdAction {
  static type = '[Category Product] Get By Id';
  constructor(public id: string) { }
}
