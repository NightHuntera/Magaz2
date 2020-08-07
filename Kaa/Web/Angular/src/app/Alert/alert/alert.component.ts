import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../Service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() Message = '';
  constructor(private Alert: AlertService) { }

  ngOnInit(): void {
  }

  CloseAlert(){
    this.Alert.HiddenAlert();
  }
}
