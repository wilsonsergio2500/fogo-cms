import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ImagesSetGallery } from "@states/images/images.actions";
import { CMS_GALLERY } from "@states/images/gallery.types";
import { CategoryGetByIdAction } from "@states/store/category/category.actions";

@Injectable()
export class AdminStoreCategoriesEditResolver implements Resolve<void> {

  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    const { id } = route.params;
    this.store.dispatch(new ImagesSetGallery(CMS_GALLERY.store));
    this.store.dispatch(new CategoryGetByIdAction(id));
    return;
  }
}
