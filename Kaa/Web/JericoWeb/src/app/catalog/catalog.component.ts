import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../Service/http.service";
import { NgForm} from '@angular/forms';
import {BsModalComponent} from 'ng2-bs3-modal';
import * as jquery from 'jquery';
import { UserService } from '../Service/user.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'catalog-app',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],

})
export class CatalogComponent implements OnInit {
  private Categori;
  private Catalogi;
  private error = '';
  public min = 0;
  public max = 1000000;
  private categorid = 1;
  PersonalAreai;
  public productID;
  public amount;
  private Korzini;
  public catalog;

  constructor(private http: HttpService, private route:Router, private user:UserService) {}

  ngOnInit() {
    this.getCategory();
    this.getSbros();

    this.PersonalAreai = this.user.GetCurrentUser();
    console.log(this.PersonalAreai.email != '');
  }

  // tslint:disable-next-line:member-ordering
  @ViewChild('KorzinaModal')
  KorzinaModal: BsModalComponent;

  getCategory() {
    this.http.get('category').subscribe((data: any) => {
      this.Categori = data;
      console.log(data);
    });
  }
  getCatalog() {
    const body = {
      CategoryId: this.categorid,
      MaxPrice: this.max,
      MinPrice: this.min,
    };
    this.error = '';
    this.http.post('catalog/Catalog', body).subscribe((data: any) => {
      this.Catalogi = data;
      console.log(data);
    }, error => {
      this.error = error;
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
      console.log(data);
    });
  }

  OpenKorzinaModal() {
    this.KorzinaModal.open();
 }

 getKorzina(id) {
  const body = {
     UserID : this.PersonalAreai.id,
     productID : id,
     Amount : this.amount = 1,
  };
  this.http.post('Basket/BasketAdd', body).subscribe((data: any) => {
    this.Catalogi = data;
    console.log(data);
    alert(data);
  });
}

getTovarinfo(id) {
  const body = {
    productID : id,
 };
 this.http.post('Model/Model', body).subscribe((data: any) => {
  this.route.navigateByUrl('/tovarinfo/'+id)
   this.Catalogi = data;
   console.log(data);
 });

}


}
