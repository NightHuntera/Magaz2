import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {HttpService} from '../Service/http.service';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-lichniy-kab',
  templateUrl: './lichniy-kab.component.html',
  styleUrls: ['./lichniy-kab.component.scss']
})
export class LichniyKabComponent implements OnInit {
   PersonalAreai;
   Tab = 'PersonalArea';

   constructor(private http: HttpService, private user: UserService) {}
  ngOnInit() {

    this.PersonalAreai = this.user.GetCurrentUser();
  }

  getPersonalAr() {
    this.http.post('PersonalArea', '').subscribe((data: any) => {
      this.PersonalAreai = data;
    });
  }

  ChangePage(Page){
     this.Tab = Page;
  }

}
