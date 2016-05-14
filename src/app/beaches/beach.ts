import { DistanceMatrix } from '../maps/distance.matrix';
export interface IBeach {
    cc: string;
    BWID: string;
    BWName: string;
    BWaterCat: string;
    SeaRegion: string;
    Region: string;
    Province: string;
    Commune: string;

    Longitude_BW:number;
    Latitude_BW:number;

    matrix?: DistanceMatrix;
    rawDistance?: number;
}
