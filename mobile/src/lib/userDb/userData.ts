import { firestore } from "$lib/auth/firebaseApp";
import type UserData from "$lib/types/UserData";
import { doc, setDoc } from "firebase/firestore";

export const getDefaultUserData = (uid: string): UserData => {
    return {
        name: "名無し",
        bio: "自己紹介文を書いてください。",
        gender: "O",
        languages: [],
        technologies: [],
        id: uid,
        avatar: "",
        swiped_people: [],
    };
}

export const setUserData = async (userData: UserData, uid: string) => {
    const targetDoc = doc(firestore, `users/${uid}`);

    await setDoc(
        targetDoc,
        userData
    )
}