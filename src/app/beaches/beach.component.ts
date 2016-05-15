import { Component, Input } from '@angular/core';

import { InstaBeach } from '../insta';
import { Beach } from './';
import { WeatherDetails } from '../weather';
import { VotingComponent } from '../voting';
import { GoogleMapsService } from '../maps/google.maps.service';

@Component({
    selector: 'beach-details',
    directives: [InstaBeach, WeatherDetails, VotingComponent],
    styles: ['' + require('./style.css')],
    template: require('./beach.html')
})
export class BeachDetails {

    @Input() beach: Beach;
    location: Position;
    private showDetails: boolean = false;

    constructor(private mapsService: GoogleMapsService) {
        mapsService.getCurrentLocation().then((position: Position) => {
            this.location = position;
        });
    }

    ngAfterContentInit() {
        this.beach.BWName = this.beach.BWName.toLowerCase();
    }

    toggleDetails() {
        this.showDetails = !this.showDetails;
    }
}