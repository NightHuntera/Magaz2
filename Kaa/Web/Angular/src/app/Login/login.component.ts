import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Service/http.service';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import {AlertService} from '../Service/alert.service';
import {TypeAlert} from '../Enum/AlertEnum';
import {Observable, throwError} from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private LoginIni;
  public login;
  public password;
  public email;
  public loginin;
  public passwordin;
  PersonalAreai;

  constructor(
    private http: HttpService,
    private route: Router,
    private user: UserService,
    private AlertS: AlertService
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
  }

  getLoginIn(Form: NgForm) {
    this.http.post('Author/login', Form.value).subscribe((data: any) => {
      this.LoginIni = data;
      this.user.SetIdentity(data);
      this.route.navigateByUrl('/profile/Avatar');
    }, error => {
      this.AlertS.VisibleAlert('Неверный логин или пароль', TypeAlert.Danger);
    });
  }
}
