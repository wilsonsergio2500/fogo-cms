import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { ImagesSetGallery } from "@states/images/images.actions";
import { CMS_GALLERY } from "@states/images/gallery.types";

@Injectable()
export class AdminPageCreateResolver implements Resolve<void> {

  constructor(
    private store: Store
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new ImagesSetGallery(CMS_GALLERY.images));
    return;
  }
}
