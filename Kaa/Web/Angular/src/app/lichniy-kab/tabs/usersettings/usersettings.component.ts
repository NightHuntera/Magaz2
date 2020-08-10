import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../Service/http.service';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../Service/user.service';
import {TypeAlert} from '../../../Enum/AlertEnum';
import {AlertService} from '../../../Service/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.scss']
})
export class UsersettingsComponent implements OnInit {
  private PersonalAreai;
  private Updati;
  FormOptions: FormGroup;

  constructor(
    private http: HttpService,
    private route: Router,
    private user: UserService,
    private AlertS: AlertService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void{
    this.PersonalAreai = this.user.GetCurrentUser();
    this.FormOptions = this.fb.group({
      UserID: [this.PersonalAreai.id],
      FIO: [this.PersonalAreai.fio, [Validators.required]],
      DateBirth: [this.PersonalAreai.dateBirth, [Validators.required]],
      Telefon: [this.PersonalAreai.telefon, [Validators.required]],
      Addres: [this.PersonalAreai.addres, [Validators.required]],
      Postcode: [this.PersonalAreai.postcode, [Validators.required]],
    });
  }

  getUpdate(): void{
    this.http.post('Author/update', this.FormOptions.value).subscribe((data: any) => {
      this.Updati = data;
      this.AlertS.VisibleAlert('Данные успешно изменены', TypeAlert.Success);
      this.user.SetIdentity(data);
      this.PersonalAreai = data;
    });
  }
}
