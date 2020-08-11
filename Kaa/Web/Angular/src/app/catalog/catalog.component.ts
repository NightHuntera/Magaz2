import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../Service/http.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {BsModalComponent} from 'ng2-bs3-modal';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';
import {AlertService} from '../Service/alert.service';
import {TypeAlert} from '../Enum/AlertEnum';
import {ModalService} from '../Service/modal.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'catalog-app',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],

})
export class CatalogComponent implements OnInit {
  Categori;
  Catalogi;
  perror = '';
  public min = 0;
  public max = 1000000;
  categorid = 1;
  PersonalAreai;
  public productID;
  public amount;
  Korzini;
  public catalog;
  FormDescription: FormGroup;

  constructor(
    private http: HttpService,
    private route: Router,
    private user: UserService,
    private AlertS: AlertService,
    public ModalS: ModalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.getCatalog();
    this.PersonalAreai = this.user.GetCurrentUser();
    this.FormDescription = this.fb.group({
      Description: [0],
    });
  }

  // tslint:disable-next-line:member-ordering
  @ViewChild('KorzinaModal')
  KorzinaModal: BsModalComponent;

  getCategory(): void {
    this.http.get('category').subscribe((data: any) => {
      this.Categori = data;
    });
  }

  getCatalog(): void {
    const body = {
      CategoryId: this.categorid,
      MaxPrice: this.max,
      MinPrice: this.min,
    };
    this.http.post('catalog/Catalog', body).subscribe((data: any) => {
      this.Catalogi = data;
    }, error => {
    });
  }

 getKorzina(id): void {
    if (this.PersonalAreai.id === undefined || this.PersonalAreai.id === 0) {
      this.AlertS.VisibleAlert('Необходимо авторизоватся', TypeAlert.Danger);
    } else {
      const body = {
        UserID : this.PersonalAreai.id,
        productID : id,
        Amount : this.amount = 1,
    };
      this.http.post('Basket/BasketAdd', body).subscribe((data: any) => {
        this.Catalogi = data;
        this.AlertS.VisibleAlert('Товар добавлен в корзину', TypeAlert.Success);
      });
  }

}

  OpenInfoModal(Description): void {
    this.FormDescription.controls.Description.setValue(Description);
    this.ModalS.OpenModal('Modal');
  }

  getTovarinfo(id): void {
  const body = {
    productID : id,
 };
  this.http.post('Model/Model', body).subscribe((data: any) => {
  this.route.navigateByUrl('/tovarinfo/' + id);
  this.Catalogi = data;
 });

}


}
