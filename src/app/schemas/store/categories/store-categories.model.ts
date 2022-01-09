import { IFireBaseEntity } from '../../../firebase/types/firebase-entity';

export interface IStoreCategoryFirebaseModel extends IFireBaseEntity {
  name: string;
  image: string;
  excerpt: string;
  rank: number;
  description: string;
}
