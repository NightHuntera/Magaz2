import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Service/http.service';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

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

  constructor(private http: HttpService, private route: Router, private user: UserService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
    console.log(this.PersonalAreai);
  }

// tslint:disable-next-line:typedef
  getLoginIn(Form: NgForm) {
    this.http.post('Author/login', Form.value).subscribe((data: any) => {
      this.LoginIni = data;
      this.user.SetIdentity(data);
      this.route.navigateByUrl('/profile');
    });
  }
}
