import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  spinner: any = null;

  constructor( private afAuth: AngularFireAuth) { }

  public SignIn(email: string, pass: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }
  public LogOut(){
    return this.afAuth.auth.signOut();
  }
}
