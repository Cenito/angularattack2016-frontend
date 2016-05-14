import { Component, OnInit } from '@angular/core';
import { JSONP_PROVIDERS } from '@angular/http';

import { Database } from './db';
import { Beaches } from './beaches';
import { GoogleMapsComponent } from './maps/google.maps.component';
import { InstaService } from './insta';
import { InstaServiceMock } from './insta';
import { WeatherService } from './weather';

require('../icons/style.css');

@Component({
  selector: 'app',
  providers: [ Database, InstaServiceMock, WeatherService, JSONP_PROVIDERS ],
  directives: [ Beaches, GoogleMapsComponent ],
  template: require('./app.html')
})

export class App implements OnInit {
  
  constructor(
    public database: Database, 
    public instaService: InstaServiceMock,
    public weatherService: WeatherService) { }
  
  ngOnInit() { }
  
  onInit() { }
}