import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../Service/user.service';

@Injectable()
export class AccessBuhGuard implements CanActivate {

    constructor(
        private router: Router,
        private user: UserService
      ) { }

      canActivate(): boolean {
        const model =  this.user.GetCurrentUser();
        if (model.typeUserID === 2) {
            return true;
        } else {
            this.router.navigate(['/main']);
            return false; }
    }

}
