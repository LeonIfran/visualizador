import { Component } from '@angular/core';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { NavController } from '@ionic/angular';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';
import { ErrorHandlerService } from 'src/app/servicios/error-handler.service';
import { FotosService } from 'src/app/servicios/fotos.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private spinner: any = null;
  public image: string = null;

  constructor(
    private authService: AutentificacionService,
    private navCtrl: NavController,
    private spinnerHand: SpinnerHandlerService,
    public errorHand: ErrorHandlerService,
    private camera: Camera,
    private fotoService: FotosService,
  ) { }


  public async LogOut() {
    this.spinner = await this.spinnerHand.GetAllPageSpinner('Cerrando.');
    this.spinner.present();

    this.authService.LogOut().then(() => {
      this.navCtrl.navigateRoot('login', { replaceUrl: true });
    }).catch(error => {
      this.errorHand.MostrarError(error);
    }).finally(() => {
      this.spinner.dismiss();
    });
  }

  public cosasLindasClick() {
    this.ObtenerFoto('linda');
    this.navCtrl.navigateForward('cosas-lindas');
  }

  public cosasFeasClick() {
    this.navCtrl.navigateForward('cosas-feas');
    this.ObtenerFoto('fea');
  }

  public async ObtenerFoto(tipo: string) {
    this.spinner = await this.spinnerHand.GetAllPageSpinner('');
    this.spinner.present();

    const camOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true,
      correctOrientation: true,
    };

    this.camera.getPicture(camOptions).then(async (pictureAux) => {
      this.spinner.dismiss();
      // Send the picture to Firebase Storage
      this.fotoService.UploadToFirebase(pictureAux, tipo);
    }, error => {
      // console.log(error);
      if (error === 'No Image Selected') {
        this.errorHand.MostrarErrorSoloLower('Cancelado.');
      } else {
        this.errorHand.MostrarErrorSoloLower('Error al tomar la foto ' + error);
      }
      // console.log(error);
      this.spinner.dismiss();
    }).catch(err => {
      // console.log(err);
      this.spinner.dismiss();
    });
  }
}
