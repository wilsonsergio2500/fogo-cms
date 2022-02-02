import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';

export interface IMetricsFirebaseModel extends IFireBaseEntity {
  categories: { [key: string]: number },
  pages: number;
  posts: number;
  storeProducts: number;
}
