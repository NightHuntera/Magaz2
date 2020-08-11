import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Service/http.service';
import {ModalService} from '../Service/modal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DefaultM} from '../Models/Default';

@Component({
  selector: 'app-buh',
  templateUrl: './buh.component.html',
  styleUrls: ['./buh.component.scss']
})
export class BuhComponent implements OnInit {
  PageSize;
  Page: any;
  Pages: any;
  Orders: any;
  FormCancel: FormGroup;
  PagginationArray = new DefaultM().Pag;

  constructor(
    private http: HttpService,
    public ModalS: ModalService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.PageSize = this.PagginationArray[0].Count;
    this.GetOrders();

    this.FormCancel = this.fb.group({
      Reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  PageChange(event): void {
    this.Page = event;
    this.GetOrders();
  }

  GetOrders(): void {
    this.http.post('Basket/OrderStorage',{}).subscribe((data: any) => {
        this.Orders = data;
        console.log(data);
    });
  }


  CanselOrder(): void {

  }
}
