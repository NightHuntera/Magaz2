import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import {AlertM} from '../Models/AlertM';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private Timer = false;
  private TimerInterval;

  constructor() { }

  // tslint:disable-next-line:typedef
  VisibleAlert(Message, Type){
    document.getElementById('Alert').getElementsByClassName('TextAlert')[0].innerHTML = Message;
    // @ts-ignore
    document.getElementById('Alert').getElementsByClassName('Alert')[0].style.display = 'flex';
    switch (Type){
      case 'error': {
        // @ts-ignore
        document.getElementById('Alert').getElementsByClassName('Alert')[0].classList.remove('Success');
        document.getElementById('Alert').getElementsByClassName('Alert')[0].classList.add('Error');
        break;
      }
      case 'success': {
        // @ts-ignore
        document.getElementById('Alert').getElementsByClassName('Alert')[0].classList.remove('Error');
        document.getElementById('Alert').getElementsByClassName('Alert')[0].classList.add('Success');
        break;
      }
    }
    if (this.Timer === true){
      clearTimeout(this.TimerInterval);
      this.TimerInterval = setTimeout(this.HiddenAlert,7000);
    } else {
      this.Timer = true;
      this.TimerInterval = setTimeout(this.HiddenAlert,7000);
    }

  }

  HiddenAlert(): void{
    // @ts-ignore
    document.getElementById('Alert').getElementsByClassName('Alert')[0].style.display = 'none';
    clearTimeout(this.TimerInterval);
    this.Timer = false;
  }
}
