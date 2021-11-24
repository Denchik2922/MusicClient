import { Stat } from "./Stat";
import { Venue } from "./Venue";

export interface Concert {
    id?:number;
    title:string;
    url:string;
    stats: Stat;
    popularity: number;
    datetime_Local: Date;
    venue: Venue;
}