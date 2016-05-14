import { DistanceRequest } from './distance.request';
import { DistanceMatrixElementResponse } from './distance.matrix.response';
export interface DistanceResponse {
    request?: DistanceRequest;
    response: DistanceMatrixElementResponse;
    status: any;
}