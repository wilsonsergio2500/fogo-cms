import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ImagesSetGallery } from '@states/images/images.actions';
import { PageSetCurrentIdSelectedAction } from '@states/pages/pages.actions';
import { CMS_GALLERY } from '@states/images/gallery.types';

@Injectable()
export class AdminPageEditResolver implements Resolve<void> {

  constructor(
    private store: Store
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    const { id } = route.params;
    this.store.dispatch(new ImagesSetGallery(CMS_GALLERY.images));
    this.store.dispatch(new PageSetCurrentIdSelectedAction(id));
    return;
  }

}
