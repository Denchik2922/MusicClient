import { Genre } from "./Genre";

export interface Song {
    id?: number;
    name: string; 
    released: Date; 
    length: string;
    genres: Genre[];
    musicAlbumId: number;
}