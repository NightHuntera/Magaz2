import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpService} from "../Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-lichniy-kab',
  templateUrl: './lichniy-kab.component.html',
  styleUrls: ['./lichniy-kab.component.css']
})
export class LichniyKabComponent implements OnInit {
   private PersonalAreai;
   selectedFile: File;
   Catalogi;

   constructor(private http: HttpService, private user:UserService) {}

  ngOnInit(  ) {

    this.PersonalAreai = this.user.GetCurrentUser();
    console.log(this.PersonalAreai);
  }

  getPersonalAr() {    
    this.http.post('PersonalArea', '').subscribe((data: any) => {
      this.PersonalAreai = data;
      console.log(data);
    });
  }

  ChangePhoto(event) {
        if (event.length > 0) {
      this.http.makeFileRequest('Author/UploadFiles', event).then( data => {
        console.log(data);
      });
    }
  }

}
