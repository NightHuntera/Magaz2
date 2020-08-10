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
  Catalogi;
  Updati;
  Void: boolean;
  FormOrder: FormGroup;

  // OrderDataModel = [
  //   new DataModalWindows(TypeObjectModal.InputText, 'ФИО', 'FIO'),
  //   new DataModalWindows(TypeObjectModal.InputText, 'Телефон', 'Telefon'),
  //   new DataModalWindows(TypeObjectModal.InputText, 'Адрес', 'Addres'),
  //   new DataModalWindows(TypeObjectModal.InputText, 'Почтовый индекс', 'Postcode'),
  // ];

  constructor(
    private http: HttpService,
    private route: Router,
    private user: UserService,
    public ModalS: ModalService,
    private fb: FormBuilder,
    private AlertS: AlertService
  ){}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
    this.getKorzina();
    this.FormOrder = this.fb.group({
      UserID: [this.PersonalAreai.id],
      Email: [this.PersonalAreai.email],
      FIO: ['', [Validators.required]],
      Telefon: ['', [Validators.required]],
      Addres: ['', [Validators.required]],
      Postcode: ['', [Validators.required]]
    });
  }
  // tslint:disable-next-line:member-ordering
  @ViewChild('KorzinaModal')
  KorzinaModal: BsModalComponent;

  getKorzina(){
       const body = {
       UserID : this.PersonalAreai.id,
    };
    this.http.post('Basket/BasketStorage', body).subscribe((data: any) => {
      this.Catalogi = data;
      if (data.length === 0){
        this.Void = true;
      } else {
        this.Void = false;
      }
    });
  }

 SubmitOrder(){
    this.ModalS.CloseModal('Modal');
    this.AlertS.VisibleAlert('Ошибка при оформлении заказа', TypeAlert.Danger);

    this.http.post('Basket/Order', this.FormOrder.value).subscribe((data: any) => {
    this.Catalogi = data;
    this.KorzinaModal.close();
    this.getKorzina();
  });
}

  getDeleteOrder(id){
  const body = {
    basketID : id,
  };
  this.http.post('Basket/Delete', body).subscribe((data: any) => {
    this.Catalogi = data;
    this.getKorzina();
    this.AlertS.VisibleAlert('Товар успешно удален', TypeAlert.Success);
    });
  }

  getTovarinfo(id){
  const body = {
    productID : id,
  };
  this.http.post('Model/Model', body).subscribe((data: any) => {
  this.route.navigateByUrl('/tovarinfo/' + id);
   this.Catalogi = data;
  });
  }

}
