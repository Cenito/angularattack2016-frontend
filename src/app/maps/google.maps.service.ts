import { Injectable } from '@angular/core';

import { DistanceResponse } from './distance.response';
import { DistanceRequest } from './distance.request';
import { map } from '../map';

declare var google;

@Injectable()
export class GoogleMapsService {

    private service;
    private currentCoordinateRequest: Promise<Position>;
    private promises: Array<[string, Promise<DistanceResponse>]>;

    private currentBucket: any;
    private currentPosition: Position;

    private waitCounter: number = 0;
    private handle: any;
    
    travelModes: Array<any>= [
        google.maps.TravelMode.WALKING,
        google.maps.TravelMode.BICYCLING,
        google.maps.TravelMode.TRANSIT,
        google.maps.TravelMode.DRIVING
    ];

    constructor() {
        this.service = new google.maps.DistanceMatrixService();
        this.currentBucket = {
            WALKING:[], BICYCLING:[], TRANSIT:[], DRIVING:[]
        };
        this.handle = {
            WALKING:0, BICYCLING:0, TRANSIT:0, DRIVING:0
        };
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
        return this.createPromise(request.latitude + '_' + request.latitude + '_' + request.travelMode, (res, rej) => {
            request.resolve = res;
            request.reject = rej;
            this.wall(25, request, (group) => { this.handleGroup(this, group); });
        });
    }

    private wall(count: number, request: DistanceRequest, callback: (group: Array<DistanceRequest>) => void) {
        this.currentBucket[request.travelMode].push(request);
        window.clearTimeout(this.handle[request.travelMode]);
        if (this.currentBucket[request.travelMode].length >= 25) {
            var handleBucket = this.currentBucket[request.travelMode];
            this.currentBucket[request.travelMode] = [];
            window.setTimeout(() => {
                callback(handleBucket);
            }, this.waitCounter * 800);
            ++this.waitCounter;
        }
        else {
            this.handle[request.travelMode] = window.setTimeout(() => {
                var handleBucket = this.currentBucket[request.travelMode];
                this.currentBucket[request.travelMode] = [];
                callback(handleBucket);
            }, 10000);
        }
    }

    private handleGroup(context: any, group: Array<DistanceRequest>) {
        if (group.length == 0) {
            return;
        }
        context.getCurrentLocation().then((currentPosition) => {
            var currentLocation = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
            var destinations = map(group, (item) => { return new google.maps.LatLng(item.latitude, item.longitude); });

            context.service.getDistanceMatrix(
                {
                    origins: [currentLocation],
                    destinations: destinations,
                    travelMode: group[0].travelMode,
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
        }).catch((error) => {
            console.log("GoogleMapsService handleGroup (error): ", error);
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