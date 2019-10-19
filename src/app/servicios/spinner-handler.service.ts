import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerHandlerService {

  constructor(private loadingCtrl: LoadingController) { }

  public async GetAllPageSpinner(messageSpinner) {
    const loader = await this.loadingCtrl.create({
      spinner: 'bubbles',
      keyboardClose: true,
      message: messageSpinner !== '' ? messageSpinner : undefined,
      showBackdrop: false,
      duration: 4000
    });

    return loader;
  }
}
