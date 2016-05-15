import { Component, OnInit } from '@angular/core';
import { JSONP_PROVIDERS } from '@angular/http';
import { RouteConfig, Router } from '@angular/router-deprecated';


import { Database } from './db';
import { Beaches } from './beaches';
import { GoogleMapsComponent } from './maps/google.maps.component';
import { InstaService } from './insta';
import { InstaServiceMock } from './insta';
import { WeatherService } from './weather';
import { VotingService } from './voting';
import { AdminService, AdminView } from './admin';

require('../icons/style.css');

@Component({
  selector: 'app',
  providers: [ Database, InstaServiceMock, WeatherService, VotingService, AdminService, JSONP_PROVIDERS ],
  template: require('./app.html')
})

@RouteConfig([
  { path: '/', name:'Beaches', component: Beaches, useAsDefault:true },
  { path: '/admin', name:'Admin', component: AdminView },
])

export class App implements OnInit {
  
  constructor(
    public database: Database, 
    public instaService: InstaServiceMock,
    public weatherService: WeatherService,
    public votingService: VotingService,
    public adminService: AdminService) { }
  
  ngOnInit() { }
  
  onInit() { }
}