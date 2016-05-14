import { DistanceMatrixValue } from './distance.matrix.value';
export interface DistanceMatrixElementResponse {
    distance?: DistanceMatrixValue;
    duration?: DistanceMatrixValue;
    status?: string;
}