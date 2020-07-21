import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../Service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private user: UserService
      ) { }

      canActivate() {
        const model =  this.user.GetCurrentUser();
        if (model['id'] != null) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false; }
    }

}
