import { Injectable } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';

@Injectable()
export class WeatherService {

    private apiKey: string = "ccabadfd7bf2461708784fed41bb716e";

    constructor(private http: Http) {
    }

    getLocationWeather(lat: number, lng: number) {

        var url = 'https://angularattack2016.ceni.to/smhi';
         //url = 'http://localhost:3040/smhi';
        //url = `http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/${lat}/lon/${lng}/data.json`;
        
        var search = new URLSearchParams();
        search.set('lat', '' + lat);
        search.set('lng', '' + lng);
        
        search.set('callback', 'JSONP_CALLBACK');
     //   search.set("units", "metric");
        
 
    //search.set('APPID', this.apiKey);
        
        return this.http
              .get(url, { search })
              .map((response) => response.json().body);
    }
}