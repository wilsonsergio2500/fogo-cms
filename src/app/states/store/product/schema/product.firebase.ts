import { FirestoreService } from '@firebase-module/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProductFirebaseModel } from './product.schema';

export class ProductFireStore extends FirestoreService<IProductFirebaseModel>{

    protected basePath = "store-products";
    constructor(angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }

}
