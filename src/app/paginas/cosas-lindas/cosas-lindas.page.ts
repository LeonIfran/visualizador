import { Component, OnInit, ViewChild } from '@angular/core';
import { Foto, FotosService } from 'src/app/servicios/fotos.service';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';
import { ErrorHandlerService } from 'src/app/servicios/error-handler.service';
import { Platform, NavController, ModalController, IonSlides } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { timer } from 'rxjs/internal/observable/timer';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {
  //@ViewChild('slideAux') slideAux: IonSlid,es;
  @ViewChild('slideAux',null) slideAux: IonSlides
  public arrayCosasLindas: Array<Foto> = null;
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
    private deviceMotion: DeviceMotion
  ) { }

  ngOnInit() {
    // console.log('Obtendo las fotos desde la Base');
    this.arrayCosasLindas = new Array<Foto>();
    this.displayed = false;
    this.ObtenerLindasDeBase();
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
          } else if (acceleration.x > -3.0 && acceleration.x < 3.0 && acceleration.y > 12.5) {
            this.GoHome();}

        }
      });
  }

  public GoHome() {
    this.navCtrl.navigateRoot('home');
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

  private async ObtenerLindasDeBase() {
    this.spinner = await this.spinnerHandler.GetAllPageSpinner('Espere');
    this.spinner.present();

    this.photoHandler.ObtenerFotos().subscribe(async (fotos) => {
      this.arrayCosasLindas = this.photoHandler.FiltrarFotos(fotos, 'linda');
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
    this.arrayCosasLindas = this.arrayCosasLindas.sort((a, b) => {
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
