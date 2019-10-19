import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, Platform } from '@ionic/angular';
import { Foto } from 'src/app/servicios/fotos.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  passedMessage: Foto = null;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    public plt: Platform
  ) {
    // componentProps can also be accessed at construction time using NavParams
  }

  ngOnInit() {
    this.passedMessage = this.navParams.get('value') as Foto;
    // console.log(this.passedMessage);
  }

  public CloseModal() {
    this.modalController.dismiss();
  }
}
