import { Component } from '@angular/core';
import { Database } from './db';
import { Beaches } from './beaches';

@Component({
  selector: 'app',
  providers: [ Database ],
  directives: [ Beaches ],
  template: require('./app.html')
})

export class App {
  
  constructor(public database: Database) {}
  
  ngOnInit() {
    console.log('It works!');
  }
}