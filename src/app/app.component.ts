import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: '<h1>AngularAttack 2016</h1><p>Cenitoon project runs!</p>'
})

export class App {
  
  constructor() {}
  
  ngOnInit() {
    console.log('It works!');
  }
}