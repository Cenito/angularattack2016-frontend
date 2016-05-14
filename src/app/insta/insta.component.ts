import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { InstaService } from './';

@Component({
    moduleId: module.id,
    selector: 'insta-beach',
    // templateUrl: 'insta.component.html'
    template: require('./insta.component.html')
})
export class InstaBeach implements OnInit {
    
    items: Observable<any>;
    
    constructor(private instaService: InstaService) {
        
        this.items = this.instaService.getLocationInfo('55.53008','13.16625').flatMap(data => {
            console.log("Finished first data");
            return this.instaService.getImages(data[0].id);
        });
     }

    ngOnInit() { }

}