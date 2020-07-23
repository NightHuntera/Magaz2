import { Component, OnInit } from '@angular/core';
import {HttpService} from "./Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './Service/user.service';

@Component({
  selector: 'contact-app',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  private PersonalAreai;

  constructor(private http: HttpService, private route:Router, private user:UserService) {}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
    console.log(this.PersonalAreai);
  }
}
