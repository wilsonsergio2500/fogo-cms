import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductLoadFirstPageAction } from '@states/store/product/product.actions';

@Injectable()
export class AdminStoreProductListResolver implements Resolve<void>{

  constructor(private store: Store) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void | Observable<void> | Promise<void> {
    this.store.dispatch(new ProductLoadFirstPageAction());
    return;
  }

}
