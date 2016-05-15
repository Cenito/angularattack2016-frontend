import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Beach } from '../beaches/beach';

declare var Socketize: any;

@Injectable()
export class Database {

    socket: any;
    beaches: Observable<Array<Beach>>;
    beachObserver: Subscriber<Array<Beach>>;
     
    private beachesById: any = {};
    
    constructor() {
       
        
        this.beaches = new Observable<Array<Beach>>((observer) => {
            this.beachObserver = observer;
            var beaches: Array<Beach> = require('../../data/beaches/se-2014.json');
            beaches.map((beach) => {
                this.beachesById[beach.BWID] = beach;
            })
            
            this.beachObserver.next(beaches);        
        });
        
    }
    
    getBeach(beachId: string) {
        return this.beachesById[beachId];
    }
    
}