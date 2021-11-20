import { Genre } from "./Genre";
import { Musician } from "./Musician";

export interface Group {
    id?: number;
    name: string;  
    country: string;
    members: Musician[]; 
    genres: Genre[];
}