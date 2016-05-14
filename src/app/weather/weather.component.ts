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
        this.weatherService.getLocationWeather(this.location.Latitude_BW, this.location.Longitude_BW)
            .subscribe((weather) => {

                this.cloudy = weather.clouds.all;
                this.temperature = weather.main.temp;
                this.windSpeed = weather.wind.speed;
                this.location.waterTemperature = 26;
            });
    }
}