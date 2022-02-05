import { FirestoreService } from '@firebase-module/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICartManagerFirebaseModel } from './cart-manager.schema';

export class CartManagerFireStore extends FirestoreService<ICartManagerFirebaseModel>{

    protected basePath = "cartManager";
    constructor(angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }

}