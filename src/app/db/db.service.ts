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
     
    constructor() {
        var params = {
            public_key: 'gNXXON_o4AC76ZUX4LPQDdj',
            auth_params: {
                username: 'cenitoon',
                payload: 'b0759015ddb72beb5020487a29436519e6153d4d4a7945c2902598efdf743260'
            }
        }
        
        
        this.beaches = new Observable<Array<Beach>>((observer) => {
            this.beachObserver = observer;
            
            var beaches = require('../../data/beaches/se-2014.json');        
            this.beachObserver.next(beaches);
        
        });
        
    }
    
}