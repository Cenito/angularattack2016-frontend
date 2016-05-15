import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import { Database } from "../db/"
import { Beach } from '../beaches/beach';


declare var Socketize: any;

export interface Vote {
    beachId: string,
    value: number
}

@Injectable()
export class VotingService {

    private socket: any;
    public voting: Observable<any>;
    private votingBeaches: any;
    
    constructor(private dbService: Database) {
        
        var beachRequest = dbService.beaches;
        beachRequest.subscribe((beaches) => {
             this.ReadInVotes( beaches );
        });
        
        this.voting = new Observable( observer => {
            this.votingBeaches = observer;
           
        }).share();
        
        var params = {
                public_key: 'gNXXON_o4AC76ZUX4LPQDdj',
                auth_params: {
                    username: 'cenitoon',
                    payload: 'b0759015ddb72beb5020487a29436519e6153d4d4a7945c2902598efdf743260'
                }
         };
            
         this.socket = new Socketize.client(params);
         this.socket.on('login', (user) => {
             
             this.socket.subscribe('beach_votes', (vote: Vote) => {
                // This will be fired when anything is published to a_channel
                var beach = dbService.getBeach(vote.beachId);
                if(beach) {
                    beach.numberOfVotes += 1;
                    beach.sumOfVotes += vote.value;
                    if(this.votingBeaches) {
                        this.votingBeaches.next(vote);
                    }
                }
             }); 
        });
    }

    sendVote(vote: Vote) {
        this.socket.publish('beach_votes', vote);    
    }
    
    ReadInVotes(beaches: Array<Beach>) {
        for (var index = 0; index < beaches.length; index++) {
            var beach = beaches[index];
            
            beach.numberOfVotes = Math.floor(Math.random() * 200);
            beach.sumOfVotes = beach.numberOfVotes * Math.floor(Math.random() * 4 + 1);
        }
    }
    
    Vote(beach:Beach, vote:number) {
        
        beach.numberOfVotes += 1;
        beach.sumOfVotes += vote; 
    }
}