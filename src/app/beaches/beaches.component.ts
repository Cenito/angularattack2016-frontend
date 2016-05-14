import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Database } from '../db';
import { GoogleMapsService } from '../maps/google.maps.service';
import { DistanceRequest } from '../maps/distance.request';
import { IBeach } from './beach'
import { Beach } from './beach.component';
import { map } from '../map';
import { filter } from '../filter';


declare var google;

@Component({
    selector: 'beaches',
    directives: [Beach],
    template: `
    <div class="row" *ngFor="let beach of beaches"><beach [beach]="beach"></beach><br>
    Name: {{ beach.BWName }}<br>
    <div>({{ beach.Longitude_BW }}, {{ beach.Latitude_BW }} )</div>
    <div *ngIf="beach.matrix.WALKING.distance">
        <h5>Walking</h5> 
        <span [innerHTML]="beach.matrix.WALKING.distance.text"></span>
        <span [innerHTML]="beach.matrix.WALKING.duration.text"></span>
    </div>
    <div *ngIf="beach.matrix.BICYCLING.distance">
        <h5>By bike</h5> 
        <span [innerHTML]="beach.matrix.BICYCLING.distance.text"></span>
        <span [innerHTML]="beach.matrix.BICYCLING.duration.text"></span>
    </div>
    <div *ngIf="beach.matrix.TRANSIT.distance">
        <h5>Transit</h5> 
        <span [innerHTML]="beach.matrix.TRANSIT.distance.text"></span>
        <span [innerHTML]="beach.matrix.TRANSIT.duration.text"></span>
    </div>
    <div *ngIf="beach.matrix.DRIVING.distance">
        <h5>Driving</h5> 
        <span [innerHTML]="beach.matrix.DRIVING.distance.text"></span>
        <span [innerHTML]="beach.matrix.DRIVING.duration.text"></span>
    </div>
    </div>
    `
})
export class Beaches {

    beaches: Array<IBeach>;

    constructor(private db: Database, private mapsService: GoogleMapsService) {
        this.beaches = [];
        var beachRequest = db.beaches;
        beachRequest.subscribe((data) => { this.calculateDistance(data); });
    }

    calculateDistance(data: Array<IBeach>) {
        this.mapsService.getCurrentLocation().then((location) => {
            var filtered = filter(data, (item) => {
                var a = Math.abs(location.coords.latitude - item.Latitude_BW);
                var b = Math.abs(location.coords.longitude - item.Longitude_BW);
                var c = Math.sqrt(a * a + b * b);
                item.rawDistance = c;
                return c < 1;
            }).sort((a, b) => {
                return a.rawDistance > b.rawDistance ? 1 : -1;
            });
            this.beaches.push(...filtered);
            
            var travelModes = this.mapsService.travelModes;
            map(travelModes, (type) => {
                map(filtered, (beach, index) => {
                    beach.matrix = {
                        WALKING: {},
                        BICYCLING: {},
                        TRANSIT: {},
                        DRIVING: {}
                    };
                    var options: DistanceRequest = {
                        latitude: beach.Latitude_BW,
                        longitude: beach.Longitude_BW,
                        name: beach.BWName,
                        travelMode: type
                    };
                    this.mapsService
                        .getDistanceToDestination(options)
                        .then((result) => {
                            if (!result.response || !result.response.distance) {
                                console.log('no results', result.response.status);
                                return;
                            }
                            beach.matrix[result.request.travelMode] = result.response;
                        });
                });
            });
        });
    }
}
