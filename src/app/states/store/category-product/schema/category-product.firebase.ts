import { FirestoreService } from '@firebase-module/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategoryProductFirebaseModel } from './category-product.schema';

export class CategoryProductFireStore extends FirestoreService<ICategoryProductFirebaseModel>{

    protected basePath = "store-categories-products";
    constructor(angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }

}
