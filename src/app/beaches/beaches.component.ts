import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Database } from '../db';

@Component({
    selector: 'beaches',
    template: `
    <ul> <li *ngFor="#beach of beaches|async" *ngIf="beach">Name: {{ beach.BWName }}<br>
    ({{ beach.Longitude_BW }}, {{ beach.Latitude_BW }} )</li> </ul>
    `
})

export class Beaches {
    
    beaches: Observable<any>;
    
    constructor(private db: Database) {
        this.beaches = db.beaches;
    }
}
