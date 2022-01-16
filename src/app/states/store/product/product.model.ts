import { IFirebasePaginationState } from '@firebase-module/types/firebase-pagination';
import { IProductFirebaseModel } from './schema/product.schema';

export interface IProductStateModel {
    loading: boolean;
    paginationState: IFirebasePaginationState<IProductFirebaseModel>;
    currentId: string,
    current: IProductFirebaseModel;
    selected: IProductFirebaseModel;
}