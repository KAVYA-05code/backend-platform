import admin from 'firebase-admin';
import serviceAccount from './serviceAccountkey.js';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { admin };
