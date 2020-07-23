import { Component, OnInit } from '@angular/core';
import {HttpService} from "../Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  private PersonalAreai;

  constructor(private http: HttpService, private route:Router, private user:UserService) {}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
    console.log(this.PersonalAreai);
  }

}
