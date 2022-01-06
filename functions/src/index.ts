import * as functions from "firebase-functions";
import * as firebaseAdmin from 'firebase-admin';

import { IUserSecurityFirebaseModel } from '../../src/app/schemas/users/user.model';


firebaseAdmin.initializeApp();

export const onUserSecurity = functions.firestore.document('/users-security/{Id}').onUpdate((change, context) => {
  const { Id } = context.params;
  const value = change.after.data() as IUserSecurityFirebaseModel;
  const { admin, blogger, editor, sales } = value;

  functions.logger.warn(`updating user ${Id}`, { admin, blogger, editor, sales });
  return firebaseAdmin.auth().setCustomUserClaims(Id, { admin, blogger, editor, sales });
})

export const PostCounter = functions.firestore.document('/posts/{Id}').onWrite((change, context) => {

  const type = 'post';
  const doc = firebaseAdmin.firestore().collection('metrics').doc('totals');

  if (!change.before.exists) {
    functions.logger.warn(`increasing ${type} counter`);
    doc.set({ posts: firebaseAdmin.firestore.FieldValue.increment(1) }, { merge: true})
  } else if (change.before.exists && change.after.exists) {
    functions.logger.warn(`updated ${type}, no action of updating counter executed`);
  } else if (!change.after.exists) {
    functions.logger.warn(`decreasing ${type} counter`);
    doc.set({ posts: firebaseAdmin.firestore.FieldValue.increment(-1) }, { merge: true});
  }

  return;

})

export const PageCounter = functions.firestore.document('/pages/{Id}').onWrite((change, context) => {

  const type = 'page';
  const doc = firebaseAdmin.firestore().collection('metrics').doc('totals');

  if (!change.before.exists) {
    functions.logger.warn(`increasing ${type} counter`);
    doc.set({ pages: firebaseAdmin.firestore.FieldValue.increment(1) }, { merge: true});
  } else if (change.before.exists && change.after.exists) {
    functions.logger.warn(`updated ${type}, no action of updating counter executed`);
  } else if (!change.after.exists) {
    functions.logger.warn(`decreasing ${type} counter`);
    doc.set({ pages: firebaseAdmin.firestore.FieldValue.increment(-1) }, { merge: true });
  }

  return;

})
