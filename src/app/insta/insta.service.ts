import {Injectable} from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InstaService {
    accesstoken: string = '550298822.038012c.3ddc660e37064e8e9ae8533ffd5251cd';

    constructor(private jsonp: Jsonp) {
        console.log("InstaService");

        // this.getLocationInfo('55.4328821','13.8096362');
    }

    getLocationInfo(lat: string, lng: string) {

        var search = new URLSearchParams();
        search.set('lat', lat);
        search.set('lng', lng);
        search.set('access_token', this.accesstoken);
        search.set('callback', 'JSONP_CALLBACK')

        return this.jsonp
            .get('https://api.instagram.com/v1/locations/search', { search })
            .map((response) => {
                return response.json().data;
            });
    }

    getImages(locationId: string) {
        var search = new URLSearchParams();
        search.set('access_token', this.accesstoken);
        search.set('callback', 'JSONP_CALLBACK')

        return this.jsonp
            .get('https://api.instagram.com/v1/locations/' + locationId + '/media/recent', { search })
            .map((response) => {
                return response.json().data;
            });
    }
}