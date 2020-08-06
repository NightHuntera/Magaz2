import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpService} from "../Service/http.service";
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
   selectedFile: File;
   Catalogi;
   scrAV = '';

   constructor(private http: HttpService, private user: UserService) {}

  ngOnInit(  ) {

    this.PersonalAreai = this.user.GetCurrentUser();
    this.scrAV = this.http.api + 'Author/Rec?UserID=' + this.PersonalAreai.id;
  }

  getPersonalAr() {
    this.http.post('PersonalArea', '').subscribe((data: any) => {
      this.PersonalAreai = data;
    });
  }

  ChangePhoto(event) {
        if (event.length > 0) {
      this.http.makeFileRequest('Author/UploadFiles', event).then( data => {
        location.reload();
      });

    }
  }

}
