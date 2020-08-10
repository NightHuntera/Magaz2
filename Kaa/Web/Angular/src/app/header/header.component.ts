import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Service/http.service';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import {AlertService} from '../Service/alert.service';
import {AlertM} from '../Models/AlertM';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  test;
  PersonalAreai;
  public alerts: Array<AlertM> = [];
constructor(private http: HttpService, private route: Router, private user: UserService, private AlertS: AlertService) {}

  ngOnInit(): void {
    this.PersonalAreai = this.user.GetCurrentUser();

    if (this.PersonalAreai !== '') {
      this.IsAuth();
    }

  }
  getVixod(): void{
    this.user.LogOut();
    this.PersonalAreai = null;
  }

  IsAuth(){
    const body = {
      UserID : this.PersonalAreai.id,
    };
    this.http.post('Basket/BasketStorage', body).subscribe((data: any) => {
    }, error => {
      if (error.status === 404){
        this.getVixod();
      }
    });
  }
}
