import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';

export interface IProductFirebaseModel extends IFireBaseEntity {
  name: string;
  publish: boolean;
  excerpt: string;
  description: string;
  price: number;
  deal: boolean;
  originalPrice: number;
  category: string;
  quantity: number;
  rank: string;
  about: string;
}
