import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Beach } from '../beaches';
import { VotingService } from './voting.service';

@Component({
    moduleId: module.id,
    selector: 'beach-voting',
    template: require('./voting.component.html')
})
export class VotingComponent implements OnInit {
    @Input() beach: Beach;

    numberOfVotes: number;
    sumOfVotes: number;
    meanVotes: number;

    constructor(private votingService: VotingService) {
        console.log("VotingComponent");
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        console.log("numberOfVotes: " + this.numberOfVotes + " sumOfVotes: " + this.sumOfVotes + " beach: " + this.beach);
        this.numberOfVotes = this.beach.NumberOfVotes;
        this.sumOfVotes = this.beach.SumOfVotes;
        if (this.numberOfVotes > 0) {
            this.meanVotes = this.sumOfVotes / this.numberOfVotes;
        }
    }
}