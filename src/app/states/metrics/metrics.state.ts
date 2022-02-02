import { Injectable } from '@angular/core';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { MetricsFireStore } from './schema/metrics.firebase';
import { IMetricsStateModel } from './metrics.model';
import { MetricsSetAsLoadingAction, MetricsSetAsDoneAction, MetricsLoadTotalsAction } from './metrics.actions';
import { tap, mergeMap, filter, distinctUntilChanged } from 'rxjs/operators';
import { IMetricsFirebaseModel } from './schema/metrics.schema';


@State<IMetricsStateModel>({
  name: 'metricsState',
  defaults: <IMetricsStateModel>{
    loading: false,
    docs: { totals: "totals" },
    totals: null
  }
})
@Injectable()
export class MetricsState {

  private schemas: MetricsFireStore;
  private subscription: Subscription;
  constructor(
    angularFireStore: AngularFirestore
  ) {
    this.schemas = new MetricsFireStore(angularFireStore);
  }

  ngxsOnInit(ctx: StateContext<IMetricsStateModel>) {
    ctx.dispatch(new MetricsLoadTotalsAction())
  }

  @Selector()
  static IsLoading(state: IMetricsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static getTotals(state: IMetricsStateModel): IMetricsFirebaseModel {
    return state.totals;
  }

  @Action(MetricsSetAsDoneAction)
  onDone(ctx: StateContext<IMetricsStateModel>) {
    ctx.patchState({
      loading: false
    });
  }

  @Action(MetricsSetAsLoadingAction)
  onLoading(ctx: StateContext<IMetricsStateModel>) {
    ctx.patchState({
      loading: true
    });
  }

  @Action(MetricsLoadTotalsAction)
  onLoadItems(ctx: StateContext<IMetricsStateModel>) {
    const { docs } = ctx.getState();
    if (!this.subscription) {
      ctx.dispatch(new MetricsSetAsLoadingAction());
      this.subscription = this.schemas.doc$(docs.totals).pipe(
        filter(x => !!x),
        distinctUntilChanged(),
        tap(totals => {
          ctx.patchState({ totals });
        }),
        mergeMap(() => ctx.dispatch(new MetricsSetAsDoneAction()))
      ).subscribe();
    }
  }

}
