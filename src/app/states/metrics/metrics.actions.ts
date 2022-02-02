
import { IPaginator } from '@firebase-module/types/firebase-pagination-inmemory';
import { IMetricsFirebaseModel } from './schema/metrics.schema';

export class MetricsSetAsLoadingAction {
  static type = '[Metrics] Set As Loading';
}

export class MetricsSetAsDoneAction {
  static type = '[Metrics] Set As Done';
}


export class MetricsLoadTotalsAction {
  static type = '[Metrics] Load Items';
}


