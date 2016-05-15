import { Component, Input, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Beach } from '../beaches';
import { WeatherService } from './weather.service';

@Component({
    moduleId: module.id,
    selector: 'weather-details',
    styles: [`` + require('./style.css')],
    directives: [NgClass],
    encapsulation: ViewEncapsulation.Emulated,
    template: require('./weather.component.html')
})
export class WeatherDetails implements AfterContentInit {
    
    @Input() location: Beach;

    cloudy: number;
    temperature: number;
    windSpeed: number;

    constructor(private weatherService: WeatherService) {  }

    ngAfterContentInit() {
        this.cloudy = 10;
        this.temperature = 22;
        this.windSpeed = 3;
        this.location.waterTemperature = 26;

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
                });
        } catch (e) {
            console.log('stupid stupid!!', e);
        }
    }
}