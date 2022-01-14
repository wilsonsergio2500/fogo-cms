import { FirestoreService } from '@firebase-module/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ICategoryFirebaseModel } from './category.schema';

export class CategoryFireStore extends FirestoreService<ICategoryFirebaseModel>{

  protected basePath = 'store-categories';
    constructor(angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }

}
