import { IFirebasePaginationInMemoryState } from '@firebase-module/types/firebase-pagination-inmemory';
import { ICategoryProductFirebaseModel } from './schema/category-product.schema';

export interface ICategoryProductStateModel {
    loading: boolean;
    paginationState: IFirebasePaginationInMemoryState<ICategoryProductFirebaseModel>;
    currentId: string,
    current: ICategoryProductFirebaseModel;
    selected: ICategoryProductFirebaseModel;
}