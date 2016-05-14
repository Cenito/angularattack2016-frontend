import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { IBeach } from '../beaches';
import { WeatherService } from './weather.service';

@Component({
    moduleId: module.id,
    selector: 'weather-details',
    styles: [`
    .icon {
        font-size: 32px;
        color: #726057;
    }`],
    directives: [ NgClass ],
    template: require('./weather.component.html')
})
export class WeatherDetails implements OnInit {
    
    @Input() location: IBeach;
    cloudy: number;
    temperature: number;
    windSpeed: number;
    
    constructor(private weatherService: WeatherService) {
        
    }

    ngOnInit() {

    }

    ngAfterContentInit() {
        if (this.location.BWName === 'SKABERSJÖVILLAN') {
            try {
            this.weatherService.getLocationWeather(this.location.Latitude_BW, this.location.Longitude_BW)
                .subscribe((weather) => {

                    if (weather.timeseries.length) {
                        var now = weather.timeseries[6];
                        //total cloud count
                        this.cloudy = now.tcc;
                        this.temperature = now.t;
                        this.windSpeed = now.ws;
                    }
                },
                (error) => {
                    this.cloudy = 0;
                    this.temperature = 0;
                    this.windSpeed = 0;
                });
            } catch (e) {
                    this.cloudy = 0;
                    this.temperature = 0;
                    this.windSpeed = 0;
                
            }
            
        }
    }

}