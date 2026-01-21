import * as functions from 'firebase-functions';
import app from './app';

/**
 * Firebase Function to handle HTTP requests using the Express app.
 * @module api
 */
export const api = functions.https.onRequest(app);