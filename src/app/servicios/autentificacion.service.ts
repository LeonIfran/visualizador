import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {

  constructor( private afAuth: AngularFireAuth) { }

  public signIn(email: string, pass: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }
  public logOut(){
    return this.afAuth.auth.signOut();
  }
}
