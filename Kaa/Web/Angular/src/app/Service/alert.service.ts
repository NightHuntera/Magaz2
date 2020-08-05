import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import {AlertM} from '../Models/AlertM';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public  alerts: Subject<AlertM> = new Subject();
  constructor() { }
}
