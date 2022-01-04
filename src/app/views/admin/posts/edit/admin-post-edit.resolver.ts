import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ImagesSetGallery } from '@states/images/images.actions';
import { PostGetCurrentSelectedAction } from '@states/posts/posts.actions';
import { CMS_GALLERY } from '@states/images/gallery.types';

@Injectable()
export class AdminPostEditResolver implements Resolve<void>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Promise<void> | Observable<void> {
    const { id } = route.params;
    this.store.dispatch(new ImagesSetGallery(CMS_GALLERY.images));
    this.store.dispatch(new PostGetCurrentSelectedAction(id));
    return;
  }

}
