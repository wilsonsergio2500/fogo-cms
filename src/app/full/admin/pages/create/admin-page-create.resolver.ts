import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngxs/store";
import { ImagesLoadAction } from "@states/images/images.actions";

@Injectable()
export class AdminPageCreateResolver implements Resolve<void> {

  constructor(
    private store: Store
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new ImagesLoadAction());;
    return;
  }
}
