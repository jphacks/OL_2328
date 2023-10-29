export interface UserSwipe {
    targetUid: string;
    liked: boolean;
}

export default interface UserData {
    gender: "M" | "F" | "O";
    id: string;
    name: string;
    technologies: string[];
    skilledTechnologies: string[];
    bio: string;
    avatar: string;
    languages: string[];
    // TODO: swiped_peopleを消す
    swiped_people?: UserSwipe[];
    github?: string;
    twitter?: string;
}