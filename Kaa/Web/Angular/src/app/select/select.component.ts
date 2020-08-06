import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  Selected = false;
  SelectOption;
  ChangeParam = false;
  @Input() ParamTitle = '';
  @Input() ParamArray = [];
  @Input() NameParamDisplay = 'name';
  @Input() NameParamOutput = 'id';
  @Output() OutputParam = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.SelectOption = this.ParamArray[0][this.NameParamDisplay];
  }

  OpenSelect(){
    if (!this.ChangeParam){
      if (this.Selected === true){
        this.Selected = false;
      } else {
        this.Selected = true;
      }
    } else {
      this.ChangeParam = false;
    }
  }

  CloseSelect(){
    this.Selected = false;
  }

  ChangeOption(Param, Name){
    if (this.SelectOption !== Name){
      this.SelectOption = Name;
      this.Selected = false;
      this.ChangeParam = true;
      this.OutputParam.emit(Param);
    }
  }
  FocusOut(){
    this.CloseSelect();
  }
}
