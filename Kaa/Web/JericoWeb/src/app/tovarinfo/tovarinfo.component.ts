import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from "../Service/http.service";
import { NgForm} from '@angular/forms';
import {BsModalComponent} from 'ng2-bs3-modal';
import * as jquery from 'jquery';
import { UserService } from '../Service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tovarinfo',
  templateUrl: './tovarinfo.component.html',
  styleUrls: ['./tovarinfo.component.css']
})
export class TovarinfoComponent implements OnInit {
  Catalogi : any;
  PersonalAreai;
  idproduct;
  Commenti;
  public amount;
  

  constructor(private http: HttpService, private route:Router, private user:UserService, private activateRoute: ActivatedRoute)  { 
    this.idproduct = activateRoute.snapshot.params['id'];
  }


  
  ngOnInit() {
    this.getTovarinfo( this.idproduct);    
    this.getOtziv(this.idproduct);

    this.PersonalAreai = this.user.GetCurrentUser();
    console.log(this.PersonalAreai.email != '');
  }

  getTovarinfo(id){
    const body = {
      productID : id,
   };
   this.http.post('Model/Model', body).subscribe((data: any) => {
     this.Catalogi = data;
     console.log(data);
   });
      
  }

  getInfoTovaro(){
    this.http.post('Model/Model', {}).subscribe((data: any) => {
      this.Catalogi = data;
      console.log(data);
  });
}

getComment(Form: NgForm) {
  Form.value['UserID'] = this.PersonalAreai.id;
  Form.value['productID'] = this.idproduct;
  this.http.post('FeedBack/Add', Form.value).subscribe((data: any) => {
    this.Commenti = data;
    this.getOtziv(this.idproduct);
  });
}

getOtziv(id){
  const body = {
    productID : id,
 };
  this.http.post('FeedBack/Storage', body).subscribe((data: any) => {
    this.Commenti = data;
    console.log(data);
});
}

getKorzina(id){
  const body = {
     UserID : this.PersonalAreai.id,
     productID : this.idproduct,
     Amount : this.amount = 1,
  };
  this.http.post('Basket/BasketAdd', body).subscribe((data: any) => {
    this.Catalogi = data;
    console.log(data);
    alert(data);
  });
}

}