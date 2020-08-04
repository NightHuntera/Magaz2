import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Service/http.service';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss']
})
export class RegistrComponent implements OnInit {
  private Registri;
  public login;
  public password;
  public email;
  public passwordin;
  PersonalAreai;

  constructor(private http: HttpService, private route: Router, private user: UserService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
  }

  // tslint:disable-next-line:typedef
  getRegistr(Form: NgForm) {
    this.http.post('Author/register', Form.value).subscribe((data: any) => {
      this.Registri = data;
      this.route.navigateByUrl('login');
    });
  }
}