import { Component, OnInit } from '@angular/core';
import {HttpService} from "../Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import {AlertService} from '../Service/alert.service';
import {AlertM} from '../Models/AlertM';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {CookieService} from "../Service/cookie.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  PersonalAreai;
  public alerts: Array<AlertM> = [];
constructor(private http: HttpService, private route: Router, private user: UserService, private AlertS: AlertService) {}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();

  }
  getVixod(){
    this.user.SetIdentity({});
    this.PersonalAreai = null;
  }
}
