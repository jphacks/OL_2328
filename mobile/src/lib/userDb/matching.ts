import { firestore } from "$lib/auth/firebaseApp";
import type { UserSwipe } from "$lib/types/UserData";
import type UserData from "$lib/types/UserData";
import { QuerySnapshot, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { setUserData } from "./userData";

export const getRecommendations = async (userData: UserData): Promise<QuerySnapshot<UserData>> => {
    const usersCollection = collection(firestore, "users");

    const targetQuery = query(
        usersCollection,
        where("skilledTechnologies", "array-contains-any", userData.technologies)
    );

    return getDocs(
        targetQuery
    ) as Promise<QuerySnapshot<UserData>>;
};

export const swipeUser = (currentUser: UserData, targetUser: UserData, liked: boolean): boolean => {
    const swipe: UserSwipe = {
        liked,
        targetUid: targetUser.id
    }

    if (currentUser.swiped_people) {
        currentUser.swiped_people.push(
            swipe
        );
    } else {
        currentUser.swiped_people = [
            swipe
        ];
    }

    setUserData(currentUser, currentUser.id);

    return liked && 
    targetUser.swiped_people?.some((value) => { if (value.liked && value.targetUid === currentUser.id) return true; })
}