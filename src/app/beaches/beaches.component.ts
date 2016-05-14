import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Database } from '../db';
import { GoogleMapsService } from '../maps/google.maps.service';
import { IBeach } from './beach'
import { Beach } from './beach.component';

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

    beaches: Array<IBeach>;

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
