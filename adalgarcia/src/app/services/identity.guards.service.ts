import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityGuardsService {
  constructor(
    private _router: Router,
    private _userService: UserService,
  ) {}

  canActivate(): boolean {
    let identity = this._userService.getIdentity();
    const now = new Date();
    if (identity) {
      const expTimestamp = identity.exp;
      const timeDifference =
        new Date(expTimestamp * 1000).getTime() - now.getTime();
      const timeRemaining = Math.floor(timeDifference / 3600);
      if (timeRemaining <= 0) {
        this.logout();
        return false;
      } else {
        return true;
      }
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    // REDIRECCION A LA PAGINA PRINCIPAL
    this._router.navigate(['/']);
  }
}
