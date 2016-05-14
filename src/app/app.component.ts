import { Component, OnInit } from '@angular/core';
import { Database } from './db';
import { Beaches } from './beaches';
import { GoogleMapsComponent } from './maps/google.maps.component'

@Component({
  selector: 'app',
  providers: [ Database ],
  directives: [ Beaches, GoogleMapsComponent ],
  template: require('./app.html')
})

export class App implements OnInit {
  
  constructor(public database: Database) { }
  
  ngOnInit() { }
  
  onInit() { }
}