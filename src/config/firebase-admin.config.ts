import * as admin from 'firebase-admin';
import { EnvConfigKeys } from '../utils/constants';

const firebaseConfig = {
  apiKey: process.env[EnvConfigKeys.FIREBASE_API_KEY],
  authDomain: process.env[EnvConfigKeys.FIREBASE_AUTH_DOMAIN],
  projectId: process.env[EnvConfigKeys.FIREBASE_PROJECT_ID],
  storageBucket: process.env[EnvConfigKeys.FIREBASE_STORAGE_BUCKET],
  messagingSenderId: process.env[EnvConfigKeys.FIREBASE_MESSAGING_SENDER_ID],
  appId: process.env[EnvConfigKeys.FIREBASE_APP_ID],
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://linkbridge-internal-test.firebaseio.com', // TODO: check this
});

export default admin;
