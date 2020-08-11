import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpService} from '../Service/http.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import {BsModalComponent} from 'ng2-bs3-modal';
import {ModalService} from '../Service/modal.service';
import { DataModalWindows} from '../Models/DataModalWindows';
import {TypeObjectModal} from '../Enum/ObjectModalType';
import {AlertService} from '../Service/alert.service';
import {TypeAlert} from '../Enum/AlertEnum';

@Component({
  selector: 'app-korzina',
  templateUrl: './korzina.component.html',
  styleUrls: ['./korzina.component.scss']
})
export class KorzinaComponent implements OnInit {
  PersonalAreai;
  Catalogi = [];
  Updati;
  FormOrder: FormGroup;

  constructor(
    private http: HttpService,
    private route: Router,
    private user: UserService,
    public ModalS: ModalService,
    private fb: FormBuilder,
    private AlertS: AlertService,

  ){}

  ngOnInit(): void {
    this.PersonalAreai = this.user.GetCurrentUser();
    this.getKorzina();
    this.FormOrder = this.fb.group({
      UserID: [this.PersonalAreai.id],
      Adress: ['', [Validators.required]]
    });
  }
  // tslint:disable-next-line:member-ordering
  @ViewChild('KorzinaModal')
  KorzinaModal: BsModalComponent;

  getKorzina(): void{
       const body = {
       UserID : this.PersonalAreai.id,
    };
       this.http.post('Basket/BasketStorage', body).subscribe((data: any) => {
      this.Catalogi = data;
    });
  }

 SubmitOrder(): void{
    this.ModalS.CloseModal('Modal');
    this.http.post('Basket/OrderAdd', this.FormOrder.value).subscribe((data: any) => {
    this.Catalogi = data;
    this.KorzinaModal.close();
    this.getKorzina();
  }, error => {
      this.AlertS.VisibleAlert(error.message, TypeAlert.Danger);
    });
}

  getDeleteOrder(id): void{
  const body = {
    basketID : id,
  };
  this.http.post('Basket/Delete', body).subscribe((data: any) => {
    this.Catalogi = data;
    this.getKorzina();
    this.AlertS.VisibleAlert('Товар успешно удален', TypeAlert.Success);
    });
  }

  getTovarinfo(id): void{
  const body = {
    productID : id,
  };
  this.http.post('Model/Model', body).subscribe((data: any) => {
  this.route.navigateByUrl('/tovarinfo/' + id);
  this.Catalogi = data;
  });
  }

}
