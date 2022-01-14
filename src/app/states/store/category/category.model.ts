import { IFirebasePaginationInMemoryState } from '@firebase-module/types/firebase-pagination-inmemory';
import { ICategoryFirebaseModel } from './schema/category.schema';

export interface ICategoryStateModel {
    loading: boolean;
    paginationState: IFirebasePaginationInMemoryState<ICategoryFirebaseModel>;
    currentId: string,
    current: ICategoryFirebaseModel;
    selected: ICategoryFirebaseModel;
}