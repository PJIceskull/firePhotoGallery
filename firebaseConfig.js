// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { Platform } from "react-native";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4HDa3uNLQfZjkgwRJU6Nicf1azkaJuHc",
  authDomain: "photogallery-n322.firebaseapp.com",
  projectId: "photogallery-n322",
  storageBucket: "photogallery-n322.firebasestorage.app",
  messagingSenderId: "819110998218",
  appId: "1:819110998218:web:bbafd3464fb5b89ff38433",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

let auth;
// Initialize Firebase
if (Platform.OS === "web") {
  // For web, use a different persistence method
  auth = initializeAuth(app);
} else {
  // For mobile, use React Native AsyncStorage
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth };
export { db };
