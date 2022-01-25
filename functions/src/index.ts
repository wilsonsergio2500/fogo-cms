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

export const UserCounter = functions.firestore.document('/users/{Id}').onWrite((change, context) => {

  const type = 'user';
  const doc = firebaseAdmin.firestore().collection('metrics').doc('totals');

  if (!change.before.exists) {
    functions.logger.warn(`increasing ${type} counter`);
    doc.set({ users: firebaseAdmin.firestore.FieldValue.increment(1) }, { merge: true });
  } else if (change.before.exists && change.after.exists) {
    functions.logger.warn(`updated ${type}, no action of updating counter executed`);
  } else if (!change.after.exists) {
    functions.logger.warn(`decreasing ${type} counter`);
    doc.set({ users: firebaseAdmin.firestore.FieldValue.increment(-1) }, { merge: true });
  }
  return;
})

export const StoreCategoryCounter = functions.firestore.document('/store-categories/{Id}').onWrite((change, context) => {

  const type = 'store-category';
  const doc = firebaseAdmin.firestore().collection('metrics').doc('totals');

  if (!change.before.exists) {
    functions.logger.warn(`increasing ${type} counter`);
    doc.set({ storeCategories: firebaseAdmin.firestore.FieldValue.increment(1) }, { merge: true });
  } else if (change.before.exists && change.after.exists) {
    functions.logger.warn(`updated ${type}, no action of updating counter executed`);
  } else if (!change.after.exists) {
    functions.logger.warn(`decreasing ${type} counter`);
    doc.set({ storeCategories: firebaseAdmin.firestore.FieldValue.increment(-1) }, { merge: true });
  }
  return;
})


export const StoreProductCounter = functions.firestore.document('/store-products/{Id}').onWrite((change, context) => {

  const type = 'store-products';
  const doc = firebaseAdmin.firestore().collection('metrics').doc('totals');

  if (!change.before.exists) {
    functions.logger.warn(`increasing ${type} counter`);
    doc.set({ storeProducts: firebaseAdmin.firestore.FieldValue.increment(1) }, { merge: true });
  } else if (change.before.exists && change.after.exists) {
    functions.logger.warn(`updated ${type}, no action of updating counter executed`);
  } else if (!change.after.exists) {
    functions.logger.warn(`decreasing ${type} counter`);
    doc.set({ storeProducts: firebaseAdmin.firestore.FieldValue.increment(-1) }, { merge: true });
  }
  return;
})

export const StoreListingCategoryCounter = functions.firestore.document('/store-product-listings/categories/{category}/{Id}').onWrite((change, context) => {

  const { category } = context.params;

  let categories: { [key: string]: number | FirebaseFirestore.FieldValue } = {};
  categories[category] = 0;

  const type = 'store-product-listings:categories';;
  const doc = firebaseAdmin.firestore().collection('metrics').doc('totals');

  if (!change.before.exists) {
    functions.logger.warn(`increasing ${type} category:${category} counter`);
    categories[category] = firebaseAdmin.firestore.FieldValue.increment(1)
    doc.set({ categories }, { merge: true });
  } else if (change.before.exists && change.after.exists) {
    functions.logger.warn(`updated ${type}, no action of updating counter executed`);
  } else if (!change.after.exists) {
    functions.logger.warn(`decreasing ${type} category:${category} counter`);
    categories[category] = firebaseAdmin.firestore.FieldValue.increment(-1)
    doc.set({ categories }, { merge: true });
  }
  return;
})
