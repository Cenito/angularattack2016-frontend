import { Component, Input } from '@angular/core';

import { InstaBeach } from '../insta';
import { IBeach } from './beach';

@Component({
    selector: 'beach',
    directives: [ InstaBeach ],
    template: require('./beach.html')
})
export class Beach {
    
    @Input() beach: IBeach;
}