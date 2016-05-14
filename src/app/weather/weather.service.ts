import { Injectable } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';

@Injectable()
export class WeatherService {

    private apiKey: string = "ccabadfd7bf2461708784fed41bb716e";

    constructor(private http: Http) {
    }

    getLocationWeather(lat: number, lng: number) {
        var search = new URLSearchParams();
        search.set('lat', '' + lat);
        search.set('lon', '' + lng);
        search.set("units", "metric");
        search.set('APPID', this.apiKey);

        return this.http
            .get('http://api.openweathermap.org/data/2.5/weather', { search })
            .map((response) => {
                return response.json();
            });
    }
}