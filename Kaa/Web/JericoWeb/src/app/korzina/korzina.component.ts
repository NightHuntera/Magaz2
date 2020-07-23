import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpService} from "../Service/http.service";
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import {BsModalComponent} from 'ng2-bs3-modal';

@Component({
  selector: 'app-korzina',
  templateUrl: './korzina.component.html',
  styleUrls: ['./korzina.component.css']
})
export class KorzinaComponent implements OnInit {
  private PersonalAreai;
  private Catalogi;
  private Updati;
  public FIO;
  public DateBirth;
  public Telefon;
  public Addres;
  public Postcode;
  length = false;

  constructor(private http: HttpService, private route:Router, private user:UserService) {}

  ngOnInit() {
    this.PersonalAreai = this.user.GetCurrentUser();
    console.log(this.PersonalAreai);
    this.getKorzina();
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
      console.log(data);
    });
  }

  OpenKorzinaModal() {
    this.KorzinaModal.open();
 }

 getKorzinaa(){
  const body = {
     UserID : this.PersonalAreai.id,
     Email : this.PersonalAreai.email,
     FIO: this.FIO,
     Telefon: this.Telefon,
     Addres: this.Addres,
     Postcode: this.Postcode,
  };
  this.http.post('Basket/Order', body).subscribe((data: any) => {
    this.Catalogi = data;
    this.KorzinaModal.close();
    this.getKorzina();
  });
}

getDeleteKz(id){
  const body = {
    basketID : id,
 };
  this.http.post('Basket/Delete', body).subscribe((data: any) => {
    this.Catalogi = data;
    this.getKorzina();
});
}

getTovarinfo(id){
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
