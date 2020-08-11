import { Component, OnInit } from '@angular/core';
import {DefaultM} from '../../../Models/Default';
import {HttpService} from '../../../Service/http.service';
import {ModalService} from '../../../Service/modal.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss']
})
export class HistoryOrderComponent implements OnInit {
  PageSize;
  Page: any;
  Pages: any;
  Orders: any;
  PagginationArray = new DefaultM().Pag;

  constructor(
    private http: HttpService,
    public ModalS: ModalService,
  ) { }

  ngOnInit(): void {
    this.PageSize = this.PagginationArray[0].Count;
  }

  PageChange(event): void {
    this.Page = event;

  }
}
