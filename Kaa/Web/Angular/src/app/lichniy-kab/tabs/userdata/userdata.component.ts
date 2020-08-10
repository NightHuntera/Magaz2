import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../../Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserdataComponent implements OnInit {
  PersonalAreai;

  constructor(private http: HttpService, private route: Router, private user: UserService) {}

  ngOnInit(): void {
    this.PersonalAreai = this.user.GetCurrentUser();
  }

}
