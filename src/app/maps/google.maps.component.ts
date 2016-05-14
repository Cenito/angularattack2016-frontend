import { Component, Input } from '@angular/core';
import { ANGULAR2_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import { GoogleMapsService } from './google.maps.service';

@Component({
  selector: 'map',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styles: [`
    .sebm-google-map-container {
      height: 600px;
    }
  `],
  template: `
    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="16">
      <sebm-google-map-marker [latitude]="search_lat" [longitude]="search_lng" [label]="'M'">
      </sebm-google-map-marker>
      
      <sebm-google-map-marker [latitude]="curr_lat" [longitude]="curr_lng" [label]="'D'">
        <sebm-google-map-info-window [disableAutoPan]="true">
          You are here! <a href="https://www.google.se/maps/dir/{{curr_lat}},{{curr_lng}}/{{search_lat}},{{search_lng}}">hype!</a>
        </sebm-google-map-info-window>
      </sebm-google-map-marker>
    </sebm-google-map>
  `
})
export class GoogleMapsComponent {
  @Input()
  lat: number;
  @Input()
  lng: number;
  
  search_lat: number = 55.6012434;
  search_lng: number = 13.000354;
  
  curr_lat: number;
  curr_lng: number;
  
  constructor(mapsService: GoogleMapsService) {
    mapsService.getCurrentLocation().then((pos: Position) => {
      this.lat = this.curr_lat = pos.coords.latitude;   
      this.lng = this.curr_lng = pos.coords.longitude;
    });   
  }
  
}