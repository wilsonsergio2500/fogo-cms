import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { NavigationState } from '@states/navigation/navigation.state';
import { Observable } from 'rxjs';
import { AuthState } from '@states/auth/auth.state';
import { AppFirebaseUser } from '@states/auth/auth.model';
import { INavigationModel } from '@firebase-schemas/navigations/navigation.model';

@Component({
  selector: 'store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  @Select(NavigationState.getNavigationRoot) navigations$: Observable<INavigationModel[]>;
  @Select(AuthState.getUser) user$: Observable<AppFirebaseUser>;
  mobileQuery: MediaQueryList;

  constructor(
    private media: MediaMatcher,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(this.mobileQueryListener.bind(this));
  }

  mobileQueryListener() {
    this.changeDetectorRef.detectChanges();
  }
  ngOnDestroy() {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  getUrlPath(path: string) {
    return `url('${path}')`;
  }
}
