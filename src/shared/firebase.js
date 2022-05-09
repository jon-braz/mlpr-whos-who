// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log('DB', db);
export default db;
