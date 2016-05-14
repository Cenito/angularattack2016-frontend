import { DistanceResponse } from './distance.response';
export interface DistanceRequest {
    latitude: number;
    longitude: number;
    name: string;
    travelMode: any;
    
    resolve?: (result: DistanceResponse) => void;
    reject?: (error: any) => void;
}