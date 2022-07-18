import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    console.log(process.env.FIREBASE_CONFIG)
    admin.initializeApp({
      credential: admin.credential.cert(process.env.FIREBASE_CONFIG as admin.ServiceAccount)
    });

  } catch (error: any) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();