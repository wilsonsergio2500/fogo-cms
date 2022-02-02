import { FirestoreService } from '@firebase-module/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IMetricsFirebaseModel } from './metrics.schema';

export class MetricsFireStore extends FirestoreService<IMetricsFirebaseModel>{

    protected basePath = "metrics";
    constructor(angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }

}