import { IFireBaseEntity } from '@firebase-module/types/firebase-entity';

export interface IProductFirebaseModel extends IFireBaseEntity {
  name: string;
  publish: boolean;
  image: string;
  excerpt: string;
  description: string;
  price: number;
  deal: boolean;
  originalPrice: number;
  category: string;
  quantity: number;
  rank: number;
  about: string;
}
