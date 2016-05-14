import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { InstaService } from './';
import { InstaServiceMock } from './';
import { IBeach } from '../beaches';


@Component({
    moduleId: module.id,
    selector: 'insta-beach',
    // templateUrl: 'insta.component.html'
    template: require('./insta.component.html')
})
export class InstaBeach  {
    
    items: Observable<any>;
    
    @Input() beach: IBeach;
    
    constructor(private instaService: InstaServiceMock) {
       
        
     }

    ngAfterContentInit() {
       if(this.beach/* && this.beach.BWName === 'SKABERSJÖVILLAN'*/) {
           
            this.items = this.instaService.getLocationInfo(this.beach.Latitude_BW.toString(), this.beach.Longitude_BW.toString()).flatMap(data => {
                return this.instaService.getImages(data[0].id);
            });
        } 
     }

}