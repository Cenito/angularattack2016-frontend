import { DistanceResult } from './distance.result';
export interface DistanceRequest {
    latitude: number;
    longitude: number;
    name: string;
    
    resolve?: (result: DistanceResult) => void;
    reject?: (error: any) => void;
}