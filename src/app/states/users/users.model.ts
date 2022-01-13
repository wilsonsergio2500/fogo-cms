import { IUserFirebaseModel } from '../../schemas/users/user.model';
import { IFirebasePaginationState } from '@firebase-module/types/firebase-pagination';

export interface IUsersStateModel {
    working: boolean;
    users: IUserFirebaseModel[];
    size: number;
  paginationState: IFirebasePaginationState<IUserFirebaseModel>;
  }
