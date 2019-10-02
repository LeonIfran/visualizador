import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
//import {auth} from 'firebase/app';
import {AutentificacionService} from 'src/app/servicios/autentificacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: any = {name: '', pass:''};
  constructor(private authService: AutentificacionService) { }

  public async LogIn(){
    if (this.validForm()) {
      this.authService.signIn(this.user.name, this.user.pass).then(()=> {
        console.log("Exito");
      })
    }
    else{
      console.log("Error");
    }
  }

  ngOnInit() {
  }
  private validForm(){
  let auxReturn: boolean = false;
  if(this.user.name && this.user.pass){
    console.log(this.user.name, this.user.pass);
    auxReturn = true;
  } 
  else{
    
  }
  return auxReturn;
}
}
