
import { IPaginator } from '@firebase-module/types/firebase-pagination-inmemory';
import { IListingFirebaseModel } from './schema/listing.schema';

export class ListingSetAsLoadingAction {
    static type = '[Listing] Set As Loading';
}

export class ListingSetAsDoneAction {
    static type = '[Listing] Set As Done';
}

export class ListingMergeAction {
  static type = '[Listing] Merge';
  constructor(public request: IListingFirebaseModel) { }
}

export class ListingMergeCategoryAction {
  static type = '[Listing] Merge Category';
  constructor(public request: IListingFirebaseModel) { }
}

export class ListingMergeDealsAction {
  static type = '[Listing] Merge Deals';
  constructor(public request: IListingFirebaseModel) { }
}

export class ListingRemoveDealsAction {
  static type = '[Listing] Remove Deals';
  constructor(public request: IListingFirebaseModel) { }
}

export class ListingRemoveAction{
  static type = '[Listing] Remove';
  constructor(public request: IListingFirebaseModel) { }
}

export class ListingSetCategoryAction {
  static type = '[Listing] Set Category';
  constructor(public category: string) {}
}

export class ListingGetByIdAction{
  static type = '[Listing] Get By Id';
  constructor(public id: string) { }
}

export class ListingLoadFirstPageAction{
  static type = '[Listing] Load First Page';
}

export class ListingLoadNextPageAction{
  static type = '[Listing] Load Next Page';
}

export class ListingLoadPreviousPageAction{
  static type = '[Listing] Load Previous Page';
}
