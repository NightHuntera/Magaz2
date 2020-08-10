import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {HttpService} from '../Service/http.service';
import { NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../Service/user.service';
import {delay} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lichniy-kab',
  templateUrl: './lichniy-kab.component.html',
  styleUrls: ['./lichniy-kab.component.scss']
})
export class LichniyKabComponent implements OnInit {
   PersonalAreai;
   Tab = 'PersonalArea';
  private subscription: Subscription;

   constructor(
     private http: HttpService,
     private user: UserService,
     private activateRoute: ActivatedRoute,
     private route: Router
   ) {
     this.Tab = activateRoute.snapshot.params.tab;
   }
  ngOnInit(): void {
    this.PersonalAreai = this.user.GetCurrentUser();
  }

  getPersonalAr(): void {
    this.http.post('PersonalArea', '').subscribe((data: any) => {
      this.PersonalAreai = data;
    });
  }

  ChangePage(Page): void{
     this.route.navigateByUrl('profile/' + Page);
     this.Tab = Page;
  }

  ChangeAvatar(): void{
  }
}
