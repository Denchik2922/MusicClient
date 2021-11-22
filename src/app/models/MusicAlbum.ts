import { Time } from "@angular/common";
import { Genre } from "./Genre";
import { Song } from "./Song";

export interface MusicAlbum {
    id?: number;
    name: string; 
    released: Date; 
    length: Time;
    songs: Song[]; 
    genres: Genre[];
    groupId: number;
}