import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ProductGetByIdAction } from '@states/store/product/product.actions';

@Injectable()
export class StoreProductResolver implements Resolve<any>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { id } = route.params;
    this.store.dispatch(new ProductGetByIdAction(id));
    // remove below line if no parameter apply
    //const pageId = route.params.pageDetailId;
    //this.store.dispatch(new StateGetElements());
    return;
  }

}
