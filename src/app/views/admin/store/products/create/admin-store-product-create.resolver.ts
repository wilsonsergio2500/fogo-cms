import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { CategoryLoadItemsAction } from '@states/store/category/category.actions';
import { ImagesSetGallery } from '@states/images/images.actions';
import { CMS_GALLERY } from '@states/images/gallery.types';

@Injectable()
export class AdminStoreProductCreateResolver implements Resolve<any>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new ImagesSetGallery(CMS_GALLERY.store));
    this.store.dispatch(new CategoryLoadItemsAction());
    return;
  }

}
