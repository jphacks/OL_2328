import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { browser } from "$app/environment";
import type { DM } from "$lib/types/DM";
import { getUserData } from "$lib/userDb/userData";
import { createDm } from "$lib/userDb/dmData";

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
  window.createDm = (targetUid: string) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        console.error("ログインしてください。");
        return;
    }

    Promise.all([getUserData(targetUid), getUserData(currentUser.uid)]).then((results) => {
        createDm(results[1], results[0]);
        console.log("DMを作成しました。");
    })
};
}