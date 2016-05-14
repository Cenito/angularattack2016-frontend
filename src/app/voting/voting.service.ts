import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Database } from "../db/"
import { Beach } from '../beaches/beach';

@Injectable()
export class VotingService {

    constructor(private dbService: Database) {
        
    }

    vote(beachId:string, vote:number) {
        
        
    }
}