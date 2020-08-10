import {TypeAlert} from '../Enum/AlertEnum';
import {TypeObjectModal} from '../Enum/ObjectModalType';


export  class DataModalWindows{
  Type: TypeObjectModal;
  Name: string;
  tag: string;
  constructor(TypeL, NameL, TagL) {
    this.Type = TypeL;
    this.Name = NameL;
    this.tag = TagL;
  }
}

