import { firestore } from "$lib/auth/firebaseApp";
import type UserData from "$lib/types/UserData";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getDefaultUserData = (uid: string): UserData => {
    return {
        name: "名無し",
        bio: "自己紹介文を書いてください。",
        gender: "O",
        languages: [],
        technologies: [],
        skilledTechnologies: [],
        id: uid,
        avatar: `avatars/${uid}.png`,
    };
}

export const setUserData = async (userData: UserData, uid: string) => {
    const targetDoc = doc(firestore, `users/${uid}`);

    await setDoc(
        targetDoc,
        userData
    )
}

export const getUserData = async (uid: string): Promise<UserData> => {
    const targetDoc = doc(firestore, `users/${uid}`);

    const targetData = await getDoc(targetDoc);

    return targetData.data() as UserData;
}