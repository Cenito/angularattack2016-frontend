import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Beach } from '../beaches';
import { WeatherService } from './weather.service';

@Component({
    moduleId: module.id,
    selector: 'weather-details',
    styles: [`
    .icon {
        font-size: 32px;
        color: #726057;
    }`],
    directives: [NgClass],
    template: require('./weather.component.html')
})
export class WeatherDetails implements OnInit {
    @Input() location: Beach;

    cloudy: number;
    temperature: number;
    windSpeed: number;

    constructor(private weatherService: WeatherService) {

    }

    ngOnInit() {

    }

    ngAfterContentInit() {
        this.weatherService.getLocationWeather(this.location.Latitude_BW, this.location.Longitude_BW)
            .subscribe((weather) => {

                this.cloudy = weather.clouds.all;
                this.temperature = weather.main.temp;
                this.windSpeed = weather.wind.speed;
            });
    }
}