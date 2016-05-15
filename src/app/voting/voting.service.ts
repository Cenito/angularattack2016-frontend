import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Database } from "../db/"
import { Beach } from '../beaches/beach';

@Injectable()
export class VotingService {

    constructor(private dbService: Database) {
        console.log("VotingService");
        
        var beachRequest = dbService.beaches;
        beachRequest.subscribe((beaches) => {
             this.ReadInVotes( beaches );
        });
    }

    ReadInVotes(beaches: Array<Beach>) {
        for (var index = 0; index < beaches.length; index++) {
            var beach = beaches[index];
            
            beach.numberOfVotes = 4;
             beach.sumOfVotes = 6;
        }
    }
    
    Vote(beach:Beach, vote:number) {
        
        beach.numberOfVotes += 1;
        beach.sumOfVotes += vote; 
    }
}