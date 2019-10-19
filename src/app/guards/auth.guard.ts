import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private navCtrl: NavController,
    private authService: AngularFireAuth) {

  }

  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.authState.pipe(map((auth) => {
      if (auth === null || auth === undefined) {
        this.navCtrl.navigateRoot('login', { replaceUrl: true });
        return false;
      } else {
        return true;
      }
    }));
  }
}
