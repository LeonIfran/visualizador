import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from 'src/environments/environment';

//Angular fire
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Firebase but for Files
import { Camera } from '@ionic-native/camera/ngx';

//Modal
import {ModalPageModule} from './paginas/modal/modal.module';

//Servicios
import { AutentificacionService} from './servicios/autentificacion.service';
import { FotosService } from './servicios/fotos.service';
import { SpinnerHandlerService } from './servicios/spinner-handler.service';

// Motion
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';//instalar esto

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    ModalPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AutentificacionService,
    SpinnerHandlerService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    DeviceMotion,
    DeviceOrientation,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
