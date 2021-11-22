import { Genre } from "./Genre";
import { MusicAlbum } from "./MusicAlbum";
import { Musician } from "./Musician";

export interface Group {
    id?: number;
    name: string;  
    country: string;
    members: Musician[]; 
    musicAlbums: MusicAlbum[];
    genres: Genre[];
}