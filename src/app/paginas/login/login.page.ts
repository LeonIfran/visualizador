import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
//import {auth} from 'firebase/app';
import {AutentificacionService} from 'src/app/servicios/autentificacion.service';
import { NavController, Platform } from '@ionic/angular';
import {ErrorHandlerService} from 'src/app/servicios/error-handler.service';
import {SpinnerHandlerService} from 'src/app/servicios/spinner-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private spinner: any = null;
  public user: any = { name: '', pass: '' };
  public userSelect: string = '';
  public selectUserOptions: any = { tittle: '' };

  constructor(private authService: AutentificacionService,
    private spinnerHand: SpinnerHandlerService,
    private navCtrl: NavController,
    public errorHand: ErrorHandlerService,
    public plt: Platform) { 
    this.selectUserOptions.tittle = 'Usuarios disponibles.';
  }

/*   public async LogIn(){
    if (this.validForm()) {
      this.authService.signIn(this.user.name, this.user.pass).then(()=> {
        console.log("Exito");
        this.navCtrl.navigateRoot('home', {replaceUrl: true});

      })
    }
    else{
      console.log("Error");
    }
  } */
  public async LogIn() {
    if (this.ValidForm()) {
      // Obtener Spiner
      this.spinner = await this.spinnerHand.GetAllPageSpinner('Cargando.');
      // Mostrar Spiner
      this.spinner.present();
      // Realizar autenticación, cambiar de página, cerrar el spinner si hay error.
      this.authService.SignIn(this.user.name, this.user.pass).then(() => {
        // console.log(data);
        this.spinner.dismiss();
        this.navCtrl.navigateRoot('home', { replaceUrl: true });
        // console.log('Login completo');
      }
      ).catch((error) => {
        this.spinner.dismiss();
        this.errorHand.MostrarError(error);
        // console.log('Error', error);
      });
    }
  }

  ngOnInit() {
  }
  private ValidForm(){
  let auxReturn: boolean = false;
  if(this.user.name && this.user.pass){
    // console.log(this.user.name, this.user.pass);
    auxReturn = true;
  } 
  else{
  
  }
  return auxReturn;
}
public UserSelectChangeBtn(user: string) {
  this.userSelect = user;
  // console.log('Cambio de usuario.');
  switch (this.userSelect) {
    case 'admin': {
      this.user.name = 'admin@admin.com';
      this.user.pass = '111111';
      break;
    }
    case 'invitado': {
      this.user.name = 'invitado@invitado.com';
      this.user.pass = '222222';
      break;
    }
    case 'usuario': {
      this.user.name = 'usuario@usuario.com';
      this.user.pass = '333333';
      break;
    }
    case 'anonimo': {
      this.user.name = 'anonimo@anonimo.com';
      this.user.pass = '444444';
      break;
    }
    case 'tester': {
      this.user.name = 'tester@tester.com';
      this.user.pass = '555555';
      break;
    }
  }
}
}
