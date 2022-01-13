import { IFirebasePaginationState } from '@firebase-module/types/firebase-pagination';
import { IUserSecurityFirebaseModel } from '../../schemas/users/user.model';

export interface IUsersSecurityStateModel {
  working: boolean;
  updating: boolean;
  userSecurities: IUserSecurityFirebaseModel[];
  size: number;
  paginationState: IFirebasePaginationState<IUserSecurityFirebaseModel>;

}

export interface IUsersSecurityTogglesOnly {
  admin?: boolean;
  editor?: boolean;
  blogger?: boolean;
  sales?: boolean;
  Id?: string;
}
