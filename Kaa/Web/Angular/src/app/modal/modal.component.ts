import {Component, Input, OnInit} from '@angular/core';
import {TypeModal} from '../Enum/ModalTypeEnum';
import {TypeObjectModal} from '../Enum/ObjectModalType';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() Type = TypeModal.Data;
  @Input() Data;
  constructor() { }

  ngOnInit(): void {
  }

}
