import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {HttpService} from './Service/http.service';
import {UserService} from './Service/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

})
export class AppComponent {
  constructor(private http: HttpService, private user: UserService) {}


}





