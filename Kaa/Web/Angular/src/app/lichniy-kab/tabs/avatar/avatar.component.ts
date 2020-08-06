import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../Service/http.service';
import {UserService} from '../../../Service/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  PersonalAreai;
  selectedFile: File;
  Catalogi;
  scrAV = '';

  constructor(private http: HttpService, private user: UserService) { }

  ngOnInit(): void {
    this.PersonalAreai = this.user.GetCurrentUser();
    this.scrAV = this.http.api + 'Author/Rec?UserID=' + this.PersonalAreai.id;
  }

  ChangePhoto(event) {
    if (event.length > 0) {
      this.http.makeFileRequest('Author/UploadFiles', event).then( data => {
        location.reload();
      });

    }
  }
}
