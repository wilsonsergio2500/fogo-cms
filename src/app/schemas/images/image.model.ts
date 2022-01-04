import { IFireBaseEntity } from '../../firebase/types/firebase-entity';
import { GalleryType } from '../../states/images/gallery.types';

export interface IImageFirebaseModel extends IFireBaseEntity {
  imageUrl: string;
  tags: string[],
  gallery?: GalleryType | string;
}
