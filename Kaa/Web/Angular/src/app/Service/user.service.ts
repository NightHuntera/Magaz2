import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HashService } from './hash.service';
import { CookieService } from './cookie.service';


const USERCOOKIEKEY = 'user';
const REQUESTKEY = '.AspNetCore.Cookies';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private cookie: CookieService,
    private dataSeq: HashService,
    private http: HttpService
  ) {}

  public SetIdentity(model) {
    this.cookie.setCookie(USERCOOKIEKEY, this.dataSeq.EncodeJSON(model), 10);
  }

  public UpdateUserInfo(model) {
    this.cookie.setCookie(USERCOOKIEKEY, this.dataSeq.EncodeJSON(model), 10);
  }

  public GetRequestCookie(){
    return this.dataSeq.DecodeJSON(this.cookie.getCookie(REQUESTKEY));
  }

  public GetCurrentUser() {
    return this.dataSeq.DecodeJSON(this.cookie.getCookie(USERCOOKIEKEY));
  }

  public IsAuth(): boolean {
    if (!(this.GetCurrentUser().operatorID)) {
      return false;
    }
    return true;
  }

  public LogOut(): void {
    this.cookie.deleteCookie(USERCOOKIEKEY);
    // this.http.get('User/Logout').subscribe();
  }
}
