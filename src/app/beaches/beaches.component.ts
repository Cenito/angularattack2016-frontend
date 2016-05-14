import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Database } from '../db';
import { GoogleMapsService } from '../maps/google.maps.service';
<<<<<<< HEAD
import { IBeach } from './beach'
import { Beach } from './beach.component';
=======
import { Beach } from './beach';
import { map } from '../map';
import { filter } from '../filter';
>>>>>>> eee7028c74d9cb0ffd642dfe86b8e7466318a4e2

@Component({
    selector: 'beaches',
    directives: [ Beach ],
    template: `
    <div class="row" *ngFor="let beach of beaches"><beach [beach]="beach"></beach><br>
    Name: {{ beach.BWName }}<br>
    ({{ beach.Longitude_BW }}, {{ beach.Latitude_BW }} ) {{beach.distanceText}}</div>
    `
})

export class Beaches {
<<<<<<< HEAD

    beaches: Array<IBeach>;
=======
    beaches: Array<Beach>;
>>>>>>> eee7028c74d9cb0ffd642dfe86b8e7466318a4e2

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
            }).sort((a,b) => {
                return a.rawDistance > b.rawDistance ? 1 : -1;
            })
            map(filtered, (beach, index) => {
                this.beaches.push(beach);
                this.mapsService
                    .getDistanceToDestination({ latitude: beach.Latitude_BW, longitude: beach.Longitude_BW, name: beach.BWName })
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
