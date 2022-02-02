import { IMetricsFirebaseModel } from './schema/metrics.schema';

type METRIC_DOCUMENTS = { totals: string }

export interface IMetricsStateModel {
  loading: boolean;
  docs: METRIC_DOCUMENTS,
  totals: IMetricsFirebaseModel
}
