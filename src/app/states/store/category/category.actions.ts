import { IPaginator } from "../../../firebase/types/firebase-pagination-inmemory";
import { IStoreCategoryFirebaseModel } from "@firebase-schemas/store/categories/store-categories.model";

export class CategoryLoadingAction {
  static type = '[Category] Set As Working';
}

export class CategoryDoneAction {
  static type = '[Category] Set As Done';
}

export class CategoryLoadItemsAction {
  static type = '[Category] Load Items';
}

export class CategorySetPaginatorAction {
  static type = '[Category] Set Paginator';
  constructor(public paginator: IPaginator) { }
}

export class CategoryPaginateItems {
  static type = '[Category] Paginate Items';
}

export class CategoryCreateAction {
  static type = '[Category] Create Page'
  constructor(public request: IStoreCategoryFirebaseModel) { }
}

export class CategoryRemoveAction {
  static type = '[Category] Remove';
  constructor(public request: IStoreCategoryFirebaseModel) { }
}

export class CategoryUpdateAction {
  static type = '[Category] Update';
  constructor(public request: IStoreCategoryFirebaseModel) { }
}
