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
    swiped_people?: string[];
    github?: string;
    twitter?: string;
}