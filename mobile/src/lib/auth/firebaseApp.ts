import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { browser } from "$app/environment";

const firebaseConfig = {
  apiKey: "AIzaSyCqAK3yoUE82yuEnrEzBAiLLO7NGKKp81M",
  authDomain: "jphacks-matching.firebaseapp.com",
  projectId: "jphacks-matching",
  storageBucket: "jphacks-matching.appspot.com",
  messagingSenderId: "67934576595",
  appId: "1:67934576595:web:8f8b068f364c3fdbd11926",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

if (browser) {
  window.signout = () => auth.signOut();
}