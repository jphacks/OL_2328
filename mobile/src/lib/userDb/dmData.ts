import { browser } from "$app/environment";
import { auth, firestore } from "$lib/auth/firebaseApp";
import type { DM } from "$lib/types/DM";
import type UserData from "$lib/types/UserData"
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getUserData } from "./userData";
import type { Message } from "$lib/types/Message";

const constructDm = (target: UserData, id: string): DM => {
    return {
        id,
        targetUid: target.id,
        targetName: target.name,
        targetAvatar: target.avatar,
    }
}

export const createDm = async (user1: UserData, user2: UserData) => {
    const id = crypto.randomUUID();

    const user1Dm: DM = constructDm(user2, id);
    const user2Dm: DM = constructDm(user1, id);

    const user1Doc = doc(firestore, `users/${user1.id}/dms/${user1Dm.id}`);
    const user2Doc = doc(firestore, `users/${user2.id}/dms/${user2Dm.id}`);

    // TODO: DMが既に存在してたら追加しない
    
    await Promise.all([
        setDoc(user1Doc, user1Dm),
        setDoc(user2Doc, user2Dm),
    ]);
}

export const createMessage = async (chatId: string, message: Message) => {
    await setDoc(
        doc(firestore, `chat/${chatId}/messages/${message.id}`),
        message
    );
}