import { Component, OnInit, ViewChild } from '@angular/core';
import { Foto, FotosService } from 'src/app/servicios/fotos.service';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';
import { ErrorHandlerService } from 'src/app/servicios/error-handler.service';
import { NavController, Platform, ModalController, IonSlides } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DeviceMotionAccelerationData, DeviceMotion } from '@ionic-native/device-motion/ngx';
import { timer } from 'rxjs/internal/observable/timer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {
  @ViewChild('slideAux',null) slideAux: IonSlides;//{static: false}

  public arrayCosasFeas: Array<Foto> = new Array<Foto>();
  public displayed: boolean = false;
  private spinner = null;
  public analizarMovimiento = null;
  public puedeMover: boolean;

  constructor(
    private photoHandler: FotosService,
    private spinnerHandler: SpinnerHandlerService,
    private errorHandler: ErrorHandlerService,
    private navCtrl: NavController,
    public modalController: ModalController,
    public plt: Platform,
    private deviceMotion: DeviceMotion,
    private _router: Router
  ) { }

  ngOnInit() {
    // console.log('Obtendo las fotos desde la Base');
    this.arrayCosasFeas = new Array<Foto>();
    this.displayed = false;
    this.ObtenerFeasDeBase();
    this.IniciarCompass();
  }

  private IniciarCompass() {
    this.puedeMover = true;
    // Comienza a escuchar los cambios en el movimiento del dispositivo
    this.analizarMovimiento = this.deviceMotion.watchAcceleration({ frequency: 9000 })
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        if (this.puedeMover) {
          if (acceleration.x > 8.0) {
            this.puedeMover = false;
            // Izquierda
            this.slideAux.slidePrev();
            timer(1000).subscribe(() => {
              this.puedeMover = true;
            });
          } else if (acceleration.x < -8.0) {
            this.puedeMover = false;
            // Derecha
            this.slideAux.slideNext();
            timer(1000).subscribe(() => {
              this.puedeMover = true;
            });
          }
          else if (acceleration.x > -3.0 && acceleration.x < 3.0 && acceleration.y > 12.5) {
            this.GoHome();}
        }
      });
  }

  public GoHome() {
    //this.navCtrl.navigateRoot('home');
    this._router.navigate(['home']);
  }

  public GoStats() {
    this.navCtrl.navigateForward('resultados');
  }

  public Like(data: Foto) {
    // this.errorHandler.MostrarErrorSoloLower('Votar: Aun no hago nada');
    this.EditarFoto(data);
  }

  public async ShowPicture(data) {
    // this.errorHandler.MostrarErrorSoloLower('Mostrar Zoom: Aun no hago nada');
    await this.PresentModal(data);
  }

  public async PresentModal(data: Foto) {
    this.puedeMover = false;
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { value: data }
    });

    modal.present();
    modal.onDidDismiss().then(() => {
      this.puedeMover = true;
      // this.errorHandler.MostrarErrorSoloLower('Dismiss');
    });
  }

  private async ObtenerFeasDeBase() {
    this.spinner = await this.spinnerHandler.GetAllPageSpinner('Espere');
    this.spinner.present();

    this.photoHandler.ObtenerFotos().subscribe(async (fotos) => {
      this.arrayCosasFeas = this.photoHandler.FiltrarFotos(fotos, 'fea');
      this.OrderByDate();
      this.displayed = true;

      this.spinner.dismiss();
    });
  }

  private async EditarFoto(data: Foto) {
    // console.log(data);

    this.photoHandler.EditarFoto(data)
      .then(response => {
      }, error => {
        this.errorHandler.MostrarErrorSolo('Error al votar');
      });
  }

  private OrderByDate() {
    this.arrayCosasFeas = this.arrayCosasFeas.sort((a, b) => {
      const fechaA = new Date(a.fecha).getDate();
      const fechaB = new Date(b.fecha).getDate();
      let auxReturn = 0;

      if (fechaA < fechaB) {
        auxReturn = 1;
      } else if (fechaA > fechaB) {
        auxReturn = -1;
      } else {
        auxReturn = 0;
      }

      return auxReturn;
    });
  }
}
