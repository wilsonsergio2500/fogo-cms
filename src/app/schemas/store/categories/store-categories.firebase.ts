import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from '../../../firebase/services/firestore.service';
import { IStoreCategoryFirebaseModel } from './store-categories.model';


export class StoreCategoryFireStore extends FirestoreService<IStoreCategoryFirebaseModel> {

  protected basePath: string = 'store-categories';
  constructor(angularFireStore: AngularFirestore) {
    super(angularFireStore);
  }
}
