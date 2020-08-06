import {Component, OnInit} from '@angular/core';
import {HttpService} from "./Service/http.service";
import {Router} from '@angular/router';
import {UserService} from './Service/user.service';
import {AlertService} from './Service/alert.service';
import {TypeAlert} from "./Enum/AlertEnum";
import {AlertM} from './Models/AlertM';
import {PagginationM} from "./Models/PagginationM";

@Component({
  selector: 'company-app',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  PersonalAreai;
  Commenti;
  Otziv = '';
  PagginationArray = [new PagginationM(2), new PagginationM(5), new PagginationM(10), new PagginationM(25)];
  PageSize = 2;
  Page = 1;

  constructor(private http: HttpService, private route: Router, private user: UserService, private AlertS: AlertService) {}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
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
