import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Database } from '../db';
import { GoogleMapsService } from '../maps/google.maps.service';
import { DistanceRequest } from '../maps/distance.request';
import { IBeach } from './beach'
import { Beach } from './beach.component';
import { map } from '../map';
import { filter } from '../filter';

@Component({
    selector: 'beaches',
    directives: [ Beach ],
    template: `
    <div class="row" *ngFor="let beach of beaches"><beach [beach]="beach"></beach></div>
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
            })
            map(filtered, (beach, index) => {
                this.beaches.push(beach);
                var options: DistanceRequest = {
                    latitude: beach.Latitude_BW,
                    longitude: beach.Longitude_BW,
                    name: beach.BWName,
                    travelMode: google.maps.TravelMode.WALKING
                };
                this.mapsService
                    .getDistanceToDestination(options)
                    .then((result) => {
                        if (!result.response || !result.response.distance) {
                            console.log('no results', result.response.status);
                            return;
                        }
                        beach.distance = result.response;
                        beach.distanceText = result.response.distance.text;
                    });
            });
        });
    }
}
