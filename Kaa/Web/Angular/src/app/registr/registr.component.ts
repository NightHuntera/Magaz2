import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Service/http.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import {AlertService} from '../Service/alert.service';
import {TypeAlert} from "../Enum/AlertEnum";

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
  FormRegister: FormGroup;
  constructor(
    private http: HttpService,
    private route: Router,
    private user: UserService,
    private fb: FormBuilder,
    private AlertS: AlertService,
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
    this.FormRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // tslint:disable-next-line:typedef
  getRegistr() {
    this.http.post('Author/register', this.FormRegister.value).subscribe((data: any) => {
      this.Registri = data;
      this.AlertS.VisibleAlert('Письмо для подтверждения отправлено на вашу почту', TypeAlert.Success);
      this.FormRegister.reset();
    }, error => {
      this.AlertS.VisibleAlert(error.message, TypeAlert.Danger);
    });
  }
}
