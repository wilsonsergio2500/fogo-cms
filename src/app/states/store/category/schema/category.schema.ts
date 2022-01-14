import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';

export interface ICategoryFirebaseModel extends IFireBaseEntity {
  name: string;
  image: string;
  excerpt: string;
  rank: number;
}
