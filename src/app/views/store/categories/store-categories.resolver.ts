import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { CategorySetOrderByFieldAction, ORDER_BY_FIELD_TYPES } from '@states/store/category/category.actions';

@Injectable()
export class StoreCategoriesResolver implements Resolve<any>{

  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.store.dispatch(new CategorySetOrderByFieldAction(ORDER_BY_FIELD_TYPES.Rank));
    return;
  }

}
