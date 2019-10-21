import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { timer } from 'rxjs/observable/timer';

import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // console.log('Inicialize App');
    this.platform.ready().then(() => {
      // console.log('Desactivo la Status Bar');
      this.statusBar.styleDefault();

      setTimeout(() => {
        // console.log('Desactivo la Splash Screen estÃ¡tica');
        this.splashScreen.hide();
      }, 3000);

      setTimeout(() => {
        // console.log('Desactivo la Splash Screen animada');
        this.showSplash = false;
      }, 8000);
    });
  }
}
