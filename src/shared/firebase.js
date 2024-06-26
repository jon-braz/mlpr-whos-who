// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzgUhy3R0Ww3A0ZEOa7PPvf0TdHAmqLt4',
  authDomain: 'mlpr-6c8b2.firebaseapp.com',
  projectId: 'mlpr-6c8b2',
  storageBucket: 'mlpr-6c8b2.appspot.com',
  messagingSenderId: '861236927130',
  appId: '1:861236927130:web:5311b3ea5aabc627ce1d23'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service ('db' in cloud documentation)
export const firestore = getFirestore(app);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);

// Get a reference to the global auth object
export const auth = getAuth(app);

// Enabled offline data persistence (any changes when offline will be saved locally and sent to server when connected)
enableIndexedDbPersistence(firestore).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
  }
});
