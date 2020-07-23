import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Service/http.service';

@Component({
  selector: 'app-buh',
  templateUrl: './buh.component.html',
  styleUrls: ['./buh.component.css']
})
export class BuhComponent implements OnInit {
  PageSize = 20;
  Page: any;
  Pages: any;
  Orders: any;

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.GetOrders();
  }
  PageChange(event) {
    this.Page = event;
    this.GetOrders();
  }

  GetOrders(){
    this.http.post('Basket/OrderStorage',{}).subscribe((data: any) => {
        this.Orders = data;
        console.log(data);
    });
  }
}
