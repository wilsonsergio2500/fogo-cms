
import { IPaginator } from '@firebase-module/types/firebase-pagination-inmemory';
import { ICategoryFirebaseModel } from './schema/category.schema';

export type OrderByFieldType = "createDate" | "rank";
export const ORDER_BY_FIELD_TYPES: { [key: string]: OrderByFieldType} = { CreatedDate: "createDate", Rank: "rank" };

export class CategorySetAsLoadingAction {
  static type = '[Category] Set As Loading';
}

export class CategorySetAsDoneAction {
  static type = '[Category] Set As Done';
}

export class CategoryCreateAction {
  static type = '[Category] Create';
  constructor(public request: ICategoryFirebaseModel) { }
}

export class CategoryLoadItemsAction {
  static type = '[Category] Load Items';
}

export class CategorySetOrderByFieldAction {
  static type = '[Category] Set Order By Field';
  constructor(public orderByField: OrderByFieldType) {}
}

export class CategorySetPaginatorAction {
  static type = '[Category] Set Paginator';
  constructor(public paginator: IPaginator) { }
}

export class CategoryPaginateItemsAction {
  static type = '[Category] Paginate Items';
}

export class CategoryRemoveAction {
  static type = '[Category] Remove';
  constructor(public request: ICategoryFirebaseModel) { }
}

export class CategoryGetByIdAction {
  static type = '[Category] Get By Id';
  constructor(public id: string) { }
}

export class CategoryUpdateAction {
  static type = '[Category] Update';
  constructor(public request: ICategoryFirebaseModel) { }

}
