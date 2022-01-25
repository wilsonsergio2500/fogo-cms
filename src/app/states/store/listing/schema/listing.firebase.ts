import { FirestoreService } from '@firebase-module/services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IListingFirebaseModel } from './listing.schema';

export class ListingFireStore extends FirestoreService<IListingFirebaseModel>{

    protected basePath = "store-product-listings";
    constructor(angularFireStore: AngularFirestore) {
        super(angularFireStore);
    }

}
