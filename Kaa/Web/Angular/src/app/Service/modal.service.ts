import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  OpenModal(id = 'Modal'){
    // @ts-ignore
    document.getElementById(id).style.display = 'block';
  }

  CloseModal(id = 'Modal'){
    document.getElementById(id).style.display = 'none';
  }
}

