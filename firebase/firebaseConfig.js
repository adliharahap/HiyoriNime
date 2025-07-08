// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCzZVyss0ylFty7ngtIsov76QGkEV2AUHw",
  authDomain: "hiyorinime.firebaseapp.com",
  projectId: "hiyorinime",
  storageBucket: "hiyorinime.appspot.com",
  messagingSenderId: "941395741581",
  appId: "1:941395741581:android:210af395cf464d176e8bc4"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
