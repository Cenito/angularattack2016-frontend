import { Injectable } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';

@Injectable()
export class WeatherService {

    private apiKey: string = "ccabadfd7bf2461708784fed41bb716e";

    constructor(private http: Http) {
    }

    getLocationWeather(lat: number, lng: number) {

        var url = 'https://angularattack2016.ceni.to/smhi';
        
        var search = new URLSearchParams();
        search.set('lat', '' + lat);
        search.set('lng', '' + lng);
        search.set("units", "metric");
        search.set('APPID', this.apiKey);

        return this.http
              .get(url, { search })
              .map((response) => response.json());
    }
}