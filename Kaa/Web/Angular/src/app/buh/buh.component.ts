import { Component, OnInit } from '@angular/core';
import {HttpService} from '../Service/http.service';

@Component({
  selector: 'app-buh',
  templateUrl: './buh.component.html',
  styleUrls: ['./buh.component.scss']
})
export class BuhComponent implements OnInit {
  PageSize = 20;
  Page: any;
  Pages: any;
  Orders: any;

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.GetOrders();
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
}
