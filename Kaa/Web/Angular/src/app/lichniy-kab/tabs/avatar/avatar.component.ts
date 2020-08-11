import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpService} from '../../../Service/http.service';
import {UserService} from '../../../Service/user.service';
import {AlertService} from '../../../Service/alert.service';
import {TypeAlert} from '../../../Enum/AlertEnum';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  PersonalAreai;
  selectedFile: File;
  scrAV = '';
  @Output() Reload = new EventEmitter();
  constructor(
    private http: HttpService,
    private user: UserService,
    private AlertS: AlertService
  ) { }

  ngOnInit(): void {
    this.PersonalAreai = this.user.GetCurrentUser();
    this.scrAV = this.http.api + 'Author/Rec?UserID=' + this.PersonalAreai.id;
  }

  ChangePhoto(event): void {
    if (event.length > 0) {
      this.http.makeFileRequest('Author/UploadFiles', event).then( data => {
        this.AlertS.VisibleAlert('Аватар успешно изменен', TypeAlert.Success);
        this.Reload.emit();
      });

    }
  }
}
