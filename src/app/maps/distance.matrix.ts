import { DistanceMatrixElementResponse } from './distance.matrix.response';
export interface DistanceMatrix {
    WALKING: DistanceMatrixElementResponse;
    BICYCLING: DistanceMatrixElementResponse;
    TRANSIT: DistanceMatrixElementResponse;
    DRIVING: DistanceMatrixElementResponse;
}