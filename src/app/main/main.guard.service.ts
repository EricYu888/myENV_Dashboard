import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppState, SESSION_STORAGE } from '../app.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private appState: AppState) {

  }

  canActivate() {
    let str = sessionStorage.getItem(SESSION_STORAGE.USER.INFO);
    if (str) {
      return true;
    }
    // this.router.navigate(['/login']);
    return false;
  }
}
