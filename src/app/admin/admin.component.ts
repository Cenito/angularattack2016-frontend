import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './admin.service';


@Component({
    selector: 'admin-view',
    template: require('./admin.component.html')
})

export class AdminView  {
    
    constructor(private adminService: AdminService) {
        console.log("AdminServiceComponent running");
     }
}