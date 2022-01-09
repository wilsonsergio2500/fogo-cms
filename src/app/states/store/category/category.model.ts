import { IFirebasePaginationInMemoryState } from "../../../firebase/types/firebase-pagination-inmemory";
import { IStoreCategoryFirebaseModel } from "@firebase-schemas/store/categories/store-categories.model";

export interface ICategoryStateModel {
  loading: boolean;
  paginationState: IFirebasePaginationInMemoryState<IStoreCategoryFirebaseModel>;
  current: IStoreCategoryFirebaseModel;

}
