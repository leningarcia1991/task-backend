import admin from 'firebase-admin';

/**
 * Initializes and exports the Firestore database instance.
 * Ensures that the Firebase app is only initialized once.
 * @module firestore.config
 */
if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();