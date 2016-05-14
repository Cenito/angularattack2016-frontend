import { Injectable } from '@angular/core';

import { DistanceResponse } from './distance.response';
import { DistanceRequest } from './distance.request';
import { map } from '../map';

@Injectable()
export class GoogleMapsService {

    private service;
    private currentCoordinateRequest: Promise<Position>;
    private promises: Array<[string, Promise<DistanceResponse>]>;

    private currentBucket: Array<any>;
    private currentPosition: Position;
    
    private waitCounter: number = 0;
    private handle: number;

    constructor() {
        this.service = new google.maps.DistanceMatrixService();
        this.currentBucket = [];
        this.promises = [];
    }

    getCurrentLocation() {
        if (!this.currentCoordinateRequest) {
            this.currentCoordinateRequest = new Promise<Position>((res, rej) => {
                navigator.geolocation.getCurrentPosition((position: Position) => {
                    this.currentPosition = position;
                    res(position);
                },
                    (err: PositionError) => { rej(err); },
                    { maximumAge: 600000 });
            });
        }
        return this.currentCoordinateRequest;
    }

    getDistanceToDestination(request: DistanceRequest) {
        return this.createPromise(request.latitude + '_' + request.latitude, (res, rej) => {
            request.resolve = res;
            request.reject = rej;
            this.wall(25, request, (group) => { this.handleGroup(this, group); });
        });
    }

    private wall(count: number, request: DistanceRequest, callback: (group: Array<DistanceRequest>) => void) {
        this.currentBucket.push(request);
        window.clearTimeout(this.handle);
        if (this.currentBucket.length >= 25) {
            var handleBucket = this.currentBucket;
            this.currentBucket = [];
            window.setTimeout(() => {
                callback(handleBucket);
            }, this.waitCounter * 3000);
            ++this.waitCounter;
        }
        else {
            this.handle = window.setTimeout(() => {
                var handleBucket = this.currentBucket;
                this.currentBucket = [];
                callback(handleBucket);
            }, 10000);
        }
    }

    private handleGroup(context: any, group: Array<DistanceRequest>) {
        context.getCurrentLocation().then((currentPosition) => {
            var currentLocation = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
            var destinations = map(group, (item) => { return new google.maps.LatLng(item.latitude, item.longitude); });

            context.service.getDistanceMatrix(
                {
                    origins: [currentLocation],
                    destinations: destinations,
                    travelMode: google.maps.TravelMode.WALKING,
                    transitOptions: null,
                    drivingOptions: null,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    avoidHighways: false,
                    avoidTolls: false,
                }, (response, status) => {
                    map(group, (request, index) => {
                        request.resolve({ response: response.rows[0].elements[index], status: status, request: request });
                    })
                });
        });
    }

    private createPromise(key, fn) {
        for (let i = 0; i < this.promises.length; ++i) {
            if (this.promises[i][0] == key) {
                return this.promises[i][1];
            }
        }
        let p = new Promise<DistanceResponse>(fn);
        let item: [string, Promise<DistanceResponse>] = [key, p];
        this.promises.push(item);
        return p;
    }
}