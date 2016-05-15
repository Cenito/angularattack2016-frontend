import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Database } from '../db';
import { GoogleMapsService } from '../maps/google.maps.service';
import { DistanceRequest } from '../maps/distance.request';
import { Beach } from './beach'
import { BeachDetails } from './beach.component';
import { map } from '../map';
import { filter } from '../filter';


declare var google;

@Component({
    selector: 'beaches',
    directives: [BeachDetails],
    template: `
    <div class="row" *ngFor="let beach of beaches">
      <beach-details [beach]="beach"></beach-details>
    </div>
    `
})
export class Beaches {

    beaches: Array<Beach>;

    constructor(private db: Database, private mapsService: GoogleMapsService) {
        this.beaches = [];
        var beachRequest = db.beaches;
        beachRequest.subscribe((data) => { this.calculateDistance(data); });
    }

    calculateDistance(data: Array<Beach>) {
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
                        }).catch((innerError) => {
                            console.log("Beaches calculateDistance (innerError): ",innerError);
                        });
                });
            });
        }).catch((error) => {
            console.log("Beaches calculateDistance (error): ", error);
        });
    }
}
