import { IImageFirebaseModel } from "@firebase-schemas/images/image.model";
import { GalleryType } from "./gallery.types";
import { IImagesRemoveRequest } from "./images.model";

export class ImagesLoading {
  static type = '[Images] Set As Working';
}

export class ImagesDone {
  static type = '[Images] Set As Done';
}

export class ImagesSetGallery {
  static type = '[Images] Set Gallery';
  constructor(public gallery: GalleryType) { }
}

export class ImageClearGallery {
  static type = '[Images] Clear Gallery';
}

export class ImagesCreateRecordAction {
  static type = '[Images] Create Records';
  constructor(public request: IImageFirebaseModel) { }
}

export class ImagesLoadFirstPageAction {
  static type = '[Images] Load First page';
}

export class ImagesLoadNextPageAction {
  static type = '[Images] Load Next Page';
}

export class ImagesLoadPreviousPageAction {
  static type = '[Images] Load Previous Page';
}

export class ImagesRemoveAction {
  static type = '[Images] Remove Image';
  constructor(public request: IImagesRemoveRequest) { }
}

