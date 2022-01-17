import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { CMS_GALLERY } from '@states/images/gallery.types';
import { ImagesSetGallery } from '@states/images/images.actions';
import { CategoryLoadItemsAction } from '@states/store/category/category.actions';
import { ProductGetByIdAction } from '@states/store/product/product.actions';

@Injectable()
export class AdminStoreProductEditResolver implements Resolve<any>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    this.store.dispatch(new ImagesSetGallery(CMS_GALLERY.store));
    this.store.dispatch(new CategoryLoadItemsAction());
    this.store.dispatch(new ProductGetByIdAction(id));
    return;
  }

}
