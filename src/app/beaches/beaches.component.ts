import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Database } from '../db';
import { GoogleMapsService } from '../maps/google.maps.service';
import { Beach } from './beach'

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
        this.map(this.beaches, (beach, index) => {
            if (index > 5) return;
            this.mapsService
                .getDistanceToDestination(beach.Latitude_BW, beach.Longitude_BW, beach.BWName)
                .then((result) => {
                    var response = result.response;
                    var minimum = undefined;
                    this.map(response.rows, (row) => {
                        this.map(row.elements, (element) => {
                            if (minimum == undefined ||  element.distance < minimum.distance) {
                                minimum = element;
                            }
                        });
                    });
                    beach.distance = minimum;
                    beach.distanceText = beach.distance.distance.text;
                });
        });

    }

    map(array: Array<any>, fn) {
        for (let i = 0; i < array.length; ++i) {
            fn(array[i], i);
        }
    }
}
