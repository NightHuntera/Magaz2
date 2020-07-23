import { Component, OnInit } from '@angular/core';
import {HttpService} from "../Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.css']
})
export class UsersettingsComponent implements OnInit {
  private PersonalAreai;
  private Updati;
  public FIO;
  public DateBirth;
  public Telefon;
  public Addres;
  public Postcode;

  constructor(private http: HttpService, private route:Router, private user:UserService) {}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
  }

  getUpdate(){
    const body = {
      UserID : this.PersonalAreai.id,
      FIO: this.FIO,
      DateBirth: this.DateBirth,
      Telefon: this.Telefon,
      Addres: this.Addres,
      Postcode: this.Postcode,
    };

    this.http.post('Author/update', body).subscribe((data: any) => {
      this.Updati = data;
      this.user.SetIdentity(data);
      this.PersonalAreai = data;
    });
  }
}
