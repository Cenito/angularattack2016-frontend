import { Injectable } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';

@Injectable()
export class WeatherService {

    private baseUrl: string = 'n'
    constructor(private http: Http) {

    }

    getLocationWeather(lat: number, lng: number) {
        var url = `http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/${lat}/lon/${lng}/data.json`;

        return this.http
            .get(url)
            .map((response) => response.json());
    }
}