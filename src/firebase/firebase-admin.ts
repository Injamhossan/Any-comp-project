
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}'
);

if (!getApps().length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
      });
  } else {
      // Fallback for dev if no service key is present (might limit functionality)
      initializeApp({
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
      });
  }
}

const adminStorage = getStorage();
const bucket = adminStorage.bucket();

export { bucket };
