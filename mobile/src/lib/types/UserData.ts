export default interface UserData {
    gender: "M" | "F" | "O";
    id: string;
    name: string;
    technologies: string[];
    bio: string;
    avatar: string;
    languages: string[];
    swiped_people: string[];
    github?: string;
    twitter?: string;
}