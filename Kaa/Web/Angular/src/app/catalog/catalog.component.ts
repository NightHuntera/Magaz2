import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../Service/http.service';
import { NgForm} from '@angular/forms';
import {BsModalComponent} from 'ng2-bs3-modal';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';
import {AlertService} from '../Service/alert.service';
import {TypeAlert} from '../Enum/AlertEnum';

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

  constructor(
    private http: HttpService,
    private route: Router,
    private user: UserService,
    private AlertS: AlertService
  ) {}

  ngOnInit() {
    this.getCategory();
    this.getSbros();

    this.PersonalAreai = this.user.GetCurrentUser();
  }

  // tslint:disable-next-line:member-ordering
  @ViewChild('KorzinaModal')
  KorzinaModal: BsModalComponent;

  getCategory() {
    this.http.get('category').subscribe((data: any) => {
      this.Categori = data;
    });
  }

  getCatalog() {
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

  getSbros() {
    const body = {
      ' CategoryId ': this.categorid,
      ' MaxPrice ': this.max = 1000000,
      ' MinPrice ': this.min = 0,
    };
    this.http.post('catalog/Catalog', body).subscribe((data: any) => {
      this.Catalogi = data;
    });
  }

 getKorzina(id) {
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

  getTovarinfo(id) {
  const body = {
    productID : id,
 };
  this.http.post('Model/Model', body).subscribe((data: any) => {
  this.route.navigateByUrl('/tovarinfo/' + id);
  this.Catalogi = data;
 });

}


}
