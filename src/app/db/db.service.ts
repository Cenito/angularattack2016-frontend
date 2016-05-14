import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var Socketize: any;

@Injectable()
export class Database {

    socket: any;
    beaches: Observable<any>;
    beach_list: any;
     
    constructor() {
        var params = {
            public_key: 'gNXXON_o4AC76ZUX4LPQDdj',
            auth_params: {
                username: 'cenitoon',
                payload: 'b0759015ddb72beb5020487a29436519e6153d4d4a7945c2902598efdf743260'
            }
        }
        
        this.beaches = new Observable((observer) => {
            this.beach_list = observer;
        });
        
        this.socket = new Socketize.client(params);    
        this.socket.on('login', (user) => {        
            this.getBeaches()
                .then((data) => {
                    this.beaches = data; 
                    this.beach_list.next(this.beaches);
            });     
        });
    }
    
    getBeaches() {
        return this.socket.getListItems('beaches')
    }
}