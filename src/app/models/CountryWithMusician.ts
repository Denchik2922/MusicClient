import { MusicianCountry } from "./MusicianCountry";

export interface CountryWithMusician {
    county:string;
    musician: MusicianCountry[];
}