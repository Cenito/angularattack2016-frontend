import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Database } from '../db';
import { GoogleMapsService } from '../maps/google.maps.service';
import { Beach } from './beach';
import { map } from '../map';

@Component({
    selector: 'beaches',
    template: `
    <ul> <li *ngFor="let beach of beaches" *ngIf="beach">Name: {{ beach.BWName }}<br>
    ({{ beach.Longitude_BW }}, {{ beach.Latitude_BW }} ) {{beach.distanceText}}</li> </ul>
    `
})

export class Beaches {
    beaches: Array<Beach>;

    constructor(private db: Database, private mapsService: GoogleMapsService) {
        this.beaches = [];
        var beachRequest = db.beaches;
        beachRequest.subscribe((data) => { this.calculateDistance(data); });
    }

    calculateDistance(data) {
        this.beaches.push(...data);
        
        map(this.beaches, (beach, index) => {
            this.mapsService
                .getDistanceToDestination({latitude: beach.Latitude_BW, longitude: beach.Longitude_BW, name: beach.BWName})
                .then((result) => {
                    if (!result.response || !result.response.distance) {
                        console.log('no results', result.response.status);
                        return;
                    }
                    beach.distance = result.response;
                    beach.distanceText = result.response.distance.text;
                });
        });
    }
}
