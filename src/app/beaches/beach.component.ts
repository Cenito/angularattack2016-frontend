import { Component, Input } from '@angular/core';

import { InstaBeach } from '../insta';
import { Beach } from './';
import { WeatherDetails } from '../weather';

@Component({
    selector: 'beach-details',
    directives: [ InstaBeach, WeatherDetails ],
    styles: [ '' + require('./style.css') ],
    template: require('./beach.html')
})
export class BeachDetails {
    
    @Input() beach: Beach;
    private showDetails: boolean = false;
    
    ngAfterContentInit() {
        this.beach.BWName = this.beach.BWName.toLowerCase();
    }
    
    toggleDetails() {
        this.showDetails = !this.showDetails;    
    }
}