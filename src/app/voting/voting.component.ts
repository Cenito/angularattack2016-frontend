import { Component, Input, OnInit, AfterContentInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Beach } from '../beaches';
import { Vote, VotingService } from './voting.service';

export class Star {
    public isSelected: boolean;
    
    constructor(public rankValue: number) {
            
    }
}


@Component({
    moduleId: module.id,
    selector: 'beach-voting',
     styles: [`
     .icon-Full.vote-star {
         font-size: 100%;
     }
     
     .icon-Full.vote-star .votes {
         font-size: 14px;
     }
     .icon-Full.vote-star .number-votes {
         font-size: 10px;
     }
        .icon-starpulsup {
            animation-name: starpulsup;
            animation-duration: 2s;
            -webkit-animation-name: starpulsup;
            -webkit-animation-duration: 2s;
        }
        .icon-starpulsdown {
            animation-name: starpulsdown;
            animation-duration: 2s;
            -webkit-animation-name: starpulsdown;
            -webkit-animation-duration: 2s;
        }
    `],
    template: require('./voting.component.html'),
})

export class VotingComponent implements AfterContentInit {
    @Input() beach: Beach;

    private numberOfVotes: number;
    private sumOfVotes: number;
    private meanVotes: number;
    private stars: Array<Star>;
    private showDetails: boolean = false;
    private formatedMean: string;
    private gotVote: boolean = false;
    private subscription: any;
    
    constructor(private votingService: VotingService) {
        
        this.stars = [new Star(1),new Star(2),new Star(3),new Star(4),new Star(5)];
    }

    ngAfterContentInit() {
        console.log('subsribed vote', this.beach.BWName);
        
        this.subscription = this.votingService.voting
            .subscribe(vote => {
            
            if(vote.beachId === this.beach.BWID) {
                console.log("calculate", vote);
                this.calculate();
                this.gotVote = true;
                setTimeout(() => {
                    this.gotVote = false;
                }, 2000);
            }
        });        
        
        this.calculate();
        
    }

    calculate(value?)  {
        if (value) {
            this.beach.numberOfVotes += 1;
            this.beach.sumOfVotes += value;
        }
        this.numberOfVotes = this.beach.numberOfVotes;
        this.sumOfVotes = this.beach.sumOfVotes;

        if (this.numberOfVotes > 0) {
            this.meanVotes = this.sumOfVotes / this.numberOfVotes;
            this.formatedMean = this.meanVotes.toFixed(1);
        } else {
            this.meanVotes = 0;
        }
    }   

    toggleDetails(event) {
        this.showDetails = !this.showDetails;
        event.preventDefault();    
    }
    
    vote(selectedStar: Star) {
        
        setTimeout(function() {
            this.showDetails = false;
       
        }, 0);
        
        var selected = false;
        for (var index = this.stars.length-1; index >= 0 ; index--) {
            var star = this.stars[index];
            
            if (selectedStar == star) {
                selected = true;
            }
            star.isSelected = selected;
        }
        this.calculate(selectedStar.rankValue);
        this.votingService.sendVote({ beachId: this.beach.BWID, value: selectedStar.rankValue});
    }
}