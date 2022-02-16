import { IProductFirebaseModel } from '@states/store/product/schema/product.schema';

export interface ICartManagerStateModel {
  loading: boolean;
  products: IProductFirebaseModel[];
}

export interface ICartStorageModel {
  products: IProductFirebaseModel[]
  updated: number | string;
}
