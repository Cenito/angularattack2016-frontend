import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Beach } from '../beaches';
import { VotingService } from './voting.service';

@Component({
    selector: 'star',
    template: require('./voting.component.html'),
    inputs: ['isSelected']
})

export class Star {
    public isSelected: boolean;
    
    constructor(rankValue: number) {
            
    }
}


@Component({
    moduleId: module.id,
    selector: 'beach-voting',
     styles: [`
    .voting {

    }`],
    template: require('./voting.component.html'),
    directives: [Star]
})

export class VotingComponent implements AfterContentInit {
    @Input() beach: Beach;

    private numberOfVotes: number;
    private sumOfVotes: number;
    private meanVotes: number;
    private stars: Array<Star>;
    private showDetails: boolean = false;

    constructor(private votingService: VotingService) {
        
        this.stars = [new Star(1),new Star(2),new Star(3),new Star(4),new Star(5)];
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.numberOfVotes = this.beach.numberOfVotes;
        this.sumOfVotes = this.beach.sumOfVotes;

        if (this.numberOfVotes > 0) {
            this.meanVotes = this.sumOfVotes / this.numberOfVotes;
        } else {
            this.meanVotes = 0;
        }
    }
    
    toggleDetails() {
        this.showDetails = !this.showDetails;    
    }
    
    vote(selectedStar: Star) {
        
        this.showDetails = false;
        
        var selected = false;
        for (var index = this.stars.length-1; index >= 0 ; index--) {
            var star = this.stars[index];
            
            if (selectedStar == star) {
                selected = true;
            }
            star.isSelected = selected;
        }
    }
}