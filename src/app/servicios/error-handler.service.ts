import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  static knownErrors: any = [
    {
      code: 'auth/user-not-found',
      message: 'El email no se encuentra registrado'
    },
    {
      code: 'auth/wrong-password',
      message: 'Contraseña Incorrecta'
    },
    {
      code: 'auth/network-request-failed',
      message: 'No hay conexión a internet'
    },
    {
      code: 'auth/invalid-email',
      message: 'Email inválido'
    },
  ];
  constructor(private alertCtrl: ToastController) { }
  private GetErrorMesasge(error: any) {
    let mensaje = 'Error desconocido';

    for (let i = 0; i < ErrorHandlerService.knownErrors.length; i++) {
      if (error.code === ErrorHandlerService.knownErrors[i].code) {
        mensaje = ErrorHandlerService.knownErrors[i].message;
        break;
      }
    }

    return mensaje;
  }

  public async MostrarError(error: any, message?: string) {
    // console.log('Ocurrio un error:', error);

    const errorMessage = this.GetErrorMesasge(error);
    const alert = await this.alertCtrl.create({
      message: message ? message + errorMessage : errorMessage,
      duration: 2000,
      position: 'top'
    });

    alert.present();
  }

  public async MostrarErrorSolo(message: string) {
    // console.log('Ocurrio un error:', message);

    const alert = await this.alertCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });

    alert.present();
  }

  public async MostrarErrorSoloLower(message: string) {
    // console.log('Ocurrio un error:', message);

    const alert = await this.alertCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    alert.present();
  }
}
