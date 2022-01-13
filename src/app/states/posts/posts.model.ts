import { IFirebasePaginationState } from '@firebase-module/types/firebase-pagination';
import { IPostFirebaseModel } from '../../schemas/posts/post.model';

export interface IPostStateModel {
  working: boolean;
  posts: IPostFirebaseModel[];
  size: number;
  paginationState: IFirebasePaginationState<IPostFirebaseModel>;
  currentPost: IPostFirebaseModel,
  selected: IPostFirebaseModel
}
