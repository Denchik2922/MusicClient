import { MusicInstrument } from "./MusicInstrument";
import { Genre } from "./Genre";

export interface Musician {
    id?: number;
    firstName: string; 
    lastName: string; 
    country: string;
    musicInstruments: MusicInstrument[]; 
    genres: Genre[];
    groupId: number;
  }