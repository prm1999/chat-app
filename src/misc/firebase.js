import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyAYjY_NYfxet1cRKkpRMlUv4zvceEjtvYA',
  authDomain: 'chat-web-app-bd4cb.firebaseapp.com',
  databaseURL: ' https://chat-web-app-bd4cb-default-rtdb.firebaseio.com/',
  projectId: 'chat-web-app-bd4cb',
  storageBucket: 'chat-web-app-bd4cb.appspot.com',
  messagingSenderId: '607068527553',
  appId: '1:607068527553:web:809c8bb9b1b9152268ad40',
  measurementId: 'G-BM3JLRH001',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
console.log(database)
