import * as firebaseAdmin from 'firebase-admin';
import { blogger, editor, superuser } from './users';


const serviceAccount = require('../service-account/sa.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

firebaseAdmin.auth().createUser({ ...superuser, emailVerified: false, disabled: false })
  .then((user) => {
    return firebaseAdmin.auth().setCustomUserClaims(user.uid, { superuser: true });
  })

firebaseAdmin.auth().createUser({ ...editor, emailVerified: false, disabled: false })
  .then((user) => {
    return firebaseAdmin.auth().setCustomUserClaims(user.uid, { editor: true });
  })

firebaseAdmin.auth().createUser({ ...blogger, emailVerified: false, disabled: false })
  .then((user) => {
    return firebaseAdmin.auth().setCustomUserClaims(user.uid, { blogger: true });
  })

