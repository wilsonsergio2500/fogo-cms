import { IFirebasePaginationInMemoryState } from '@firebase-module/types/firebase-pagination-inmemory';
import { IProductFirebaseModel } from '../../../states/store/product/schema/product.schema';
import { ICartManagerFirebaseModel } from './schema/cart-manager.schema';

export interface ICartManagerStateModel {
    loading: boolean;
    paginationState: IFirebasePaginationInMemoryState<ICartManagerFirebaseModel>;
    currentId: string,
    current: ICartManagerFirebaseModel;
  selected: ICartManagerFirebaseModel;

  products: IProductFirebaseModel[];
}

export interface ICartStorageModel {
  products: IProductFirebaseModel[]
  updated: number | string;
}
