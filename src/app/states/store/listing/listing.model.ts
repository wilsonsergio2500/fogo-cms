import { IFirebasePaginationState } from '@firebase-module/types/firebase-pagination';
import { IListingFirebaseModel } from './schema/listing.schema';

export interface IListingStateModel {
    loading: boolean;
    paginationState: IFirebasePaginationState<IListingFirebaseModel>;
    currentId: string,
    current: IListingFirebaseModel;
    selected: IListingFirebaseModel;
}