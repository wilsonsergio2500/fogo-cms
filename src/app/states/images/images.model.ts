import { IFirebasePaginationState } from '@firebase-module/types/firebase-pagination';
import { IImageFirebaseModel } from "@firebase-schemas/images/image.model";

export interface IImagesStateModel {
  loading: boolean;
  paginationState: IFirebasePaginationState<IImageFirebaseModel>;
  gallery: string;
}

export interface IImagesRemoveRequest {
  id: string;
  path: string;
}
