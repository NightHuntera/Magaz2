import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  OpenModal(id){
    // @ts-ignore
    document.getElementById(id).style.display = 'block';
  }

  CloseModal(id){
    document.getElementById(id).style.display = 'none';
  }
}

