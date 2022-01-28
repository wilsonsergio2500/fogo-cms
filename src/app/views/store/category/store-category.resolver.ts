import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { ListingSetCategoryAction } from '@states/store/listing/listing.actions';

@Injectable()
export class StoreCategoryResolver implements Resolve<any>{

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { category } = route.params;
    this.store.dispatch(new ListingSetCategoryAction(category))
    return;
  }

}
