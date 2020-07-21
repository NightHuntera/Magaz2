import { Component, OnInit } from '@angular/core';
import {HttpService} from "../Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.css']
})
export class RegistrComponent implements OnInit {
  private Registri;
  private LoginIni;
  public login;
  public password;
  public email;
  public loginin;
  public passwordin;
  public invisreg = true;
  private PersonalAreai;

  constructor(private http: HttpService, private route:Router, private user:UserService) {}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
    console.log(this.PersonalAreai);
  }

  getRegistr(Form: NgForm) {
    this.http.post('Author/register', Form.value).subscribe((data: any) => {
      this.Registri = data;
      alert(data);
      console.log(this.Registri);
    });
  }

  getLoginIn(Form: NgForm) {
      this.http.post('Author/login', Form.value).subscribe((data: any) => {
      this.LoginIni = data;
      this.user.SetIdentity(data);
      this.route.navigateByUrl('/profile')
      });
  }
}
