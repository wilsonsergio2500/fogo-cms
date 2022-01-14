import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CategoryLoadItemsAction } from '@states/store/category/category.actions';

@Injectable()
export class AdminStoreCategoriesListResolver implements Resolve<void>{

  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    this.store.dispatch(new CategoryLoadItemsAction())
    return;
  }
}
