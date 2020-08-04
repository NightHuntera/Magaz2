import { Component, OnInit } from '@angular/core';
import {HttpService} from "./Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './Service/user.service';

@Component({
  selector: 'company-app',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  PersonalAreai;
  Commenti;
  Otziv = '';

  constructor(private http: HttpService, private route: Router, private user: UserService) {}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
   // console.log(this.PersonalAreai);
    this.getOtziv();
  }

  newOtziv(){
    this.http.post('FeedBack/Add',{Feedback: this.Otziv, UserID: this.PersonalAreai.id} ).subscribe((data: any) => {
      this.Commenti = data;
      this.Otziv = '';
      this.getOtziv();

    });
  }

  getOtziv(){
    const body = {};
    this.http.post('FeedBack/Storage', body).subscribe((data: any) => {
      this.Commenti = data;
    });
  }
}
