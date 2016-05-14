import { Injectable } from '@angular/core';
import { DistanceMatrix } from './distance-matrix';

@Injectable()
export class GoogleMapsService {

    private currentCoordinateRequest: Promise<Position>;
    private service;
    private promises: Array<[string, Promise<DistanceMatrix>]>;
    private currentPosition: Position;

    constructor() {
        this.service = new google.maps.DistanceMatrixService();
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

    getDistanceToDestination(lat, long, name) {
        return this.createPromise(lat + '_' + long, (res, rej) => {
            this.getCurrentLocation().then(() => {
                var origin1 = new google.maps.LatLng(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude);
                var origin2 = "My location";
                var destinationA = name || 'Destination';
                var destinationB = new google.maps.LatLng(lat, long);

                this.service.getDistanceMatrix(
                    {
                        origins: [origin1, origin2],
                        destinations: [destinationA, destinationB],
                        travelMode: google.maps.TravelMode.WALKING,
                        transitOptions: null,
                        drivingOptions: null,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        avoidHighways: false,
                        avoidTolls: false,
                    }, (response, status) => {
                        res({ response: response, status: status });
                    });
            });
        });
    }

    createPromise(key, fn) {
        for (let i = 0; i < this.promises.length; ++i) {
            if (this.promises[i][0] == key) {
                return this.promises[i][1];
            }
        }
        let p = new Promise<DistanceMatrix>(fn);
        let item: [string, Promise<DistanceMatrix>] = [key, p];
        this.promises.push(item);
        return p;
    }
}