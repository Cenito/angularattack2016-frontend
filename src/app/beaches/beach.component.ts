import { Component, Input } from '@angular/core';

import { InstaBeach } from '../insta';
import { IBeach } from './beach';
import { WeatherDetails } from '../weather';

@Component({
    selector: 'beach',
    directives: [ InstaBeach, WeatherDetails ],
    template: require('./beach.html')
})
export class Beach {
    
    @Input() beach: IBeach;
    
    ngAfterContentInit() {
        
        if(this.beach.BWName === 'SKABERSJÖVILLAN') {
            
        }
    }
}