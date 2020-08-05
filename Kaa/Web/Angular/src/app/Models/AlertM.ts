import {TypeAlert} from '../Enum/AlertEnum';

export  class AlertM{
  text: string;
  type: TypeAlert;

  constructor(text, type = TypeAlert.Success) {
    this.text = text;
    this.type = type;
  }
}
