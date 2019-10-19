import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { SpinnerHandlerService } from 'src/app/servicios/spinner-handler.service';
import { Foto, FotosService } from 'src/app/servicios/fotos.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {
  @ViewChild('barCanvas',{static: false}) barCanvas: any;
  @ViewChild('doughnutCanvas',{static: false}) doughnutCanvas: any;

  public barChart: any;
  public doughnutChart: any;
  private spinner = null;
  private arrayCosasLindas = new Array<Foto>();
  private arrayCosasFeas = new Array<Foto>();

  constructor(
    private navCtrl: NavController,
    public plt: Platform,
    public spinnerCtrl: SpinnerHandlerService,
    private photoHandler: FotosService,
    private modalController: ModalController
  ) { }

  public async ngOnInit() {
    this.ObtenerFeasDeBase();
    this.ObtenerLindasDeBase();
  }

  private async ObtenerLindasDeBase() {
    const spinner = await this.spinnerCtrl.GetAllPageSpinner('Cargando Estadisticas de Cosas Lindas');
    spinner.present();

    this.photoHandler.ObtenerFotos().subscribe(async (fotos) => {
      this.arrayCosasLindas = this.photoHandler.FiltrarFotos(fotos, 'linda');
      const cosasLindasNombre = new Array<string>();
      const cosasLindasVotos = new Array<number>();
      const cosasLindasColores = new Array<string>();
      const cosasLindasColoresBorde = new Array<string>();

      for (const dato of this.arrayCosasLindas) {
        cosasLindasNombre.push(dato.id);
        cosasLindasVotos.push(dato.votos);
        const color = this.GenerarColor();
        cosasLindasColores.push(color + ', 0.5)');
        cosasLindasColoresBorde.push(color + ', 1)');
      }

      this.doughnutChartMethod(cosasLindasNombre, cosasLindasVotos, cosasLindasColores, cosasLindasColoresBorde);
      spinner.dismiss();
    });
  }

  private async ObtenerFeasDeBase() {
    const spinner = await this.spinnerCtrl.GetAllPageSpinner('Cargando Estadisticas de Cosas Feas');
    spinner.present();

    this.photoHandler.ObtenerFotos().subscribe(async (fotos) => {
      this.arrayCosasFeas = this.photoHandler.FiltrarFotos(fotos, 'fea');
      const cosasFeasNombre = new Array<string>();
      const cosasFeasVotos = new Array<number>();
      const cosasFeasColores = new Array<string>();
      const cosasFeasColoresBorde = new Array<string>();

      for (const dato of this.arrayCosasFeas) {
        cosasFeasNombre.push(dato.id);
        cosasFeasVotos.push(dato.votos);
        const color = this.GenerarColor();
        cosasFeasColores.push(color + ', 0.3)');
        cosasFeasColoresBorde.push(color + ', 1)');
      }

      this.barChartMethod(cosasFeasNombre, cosasFeasVotos, cosasFeasColores, cosasFeasColoresBorde);
      spinner.dismiss();
    });
  }

  private GetRandomInt(): number {
    return Math.floor(Math.random() * (255 - 0)) + 0;
  }

  private GenerarColor(): string {
    const auxReturn = `rgba(${this.GetRandomInt()}, ${this.GetRandomInt()}, ${this.GetRandomInt()}`;
    // console.log(auxReturn);
    return auxReturn;
  }

  public GoHome() {
    this.navCtrl.navigateRoot('home');
  }

  private barChartMethod(nombres: string[], votos: number[], colores: string[], bordes: string[]) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: nombres,
        datasets: [{
          label: '# de Votos',
          data: votos,
          backgroundColor: colores,
          borderColor: bordes,
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              // fontSize: 1
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 0
            }
          }]
        },
        onClick: (e, legendItem: any) => {
          // console.log(legendItem);
          if (legendItem[0] !== undefined) {
            const index = legendItem[0]._model.label;
            // console.log(index);
            this.ShowPicture(index, 'fea');
          }
        },
        tooltips: {
          enabled: false,
        }
      },
    });
  }

  private doughnutChartMethod(nombres: string[], votos: number[], colores: string[], bordes: string[]) {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: nombres,
        datasets: [{
          data: votos,
          backgroundColor: colores,
          borderColor: bordes,
          // hoverBackgroundColor: bordes,
          borderWidth: 1,
        }]
      },
      options: {
        legend: {
          display: false,
        },
        onClick: (e, legendItem: any) => {
          // console.log(legendItem);
          if (legendItem[0] !== undefined) {
            const index = legendItem[0]._model.label;
            // console.log(index);
            this.ShowPicture(index, 'linda');
          }
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }

  private GetDataFeas(label: string): Foto {
    let fotoReturn: Foto;

    for (const data of this.arrayCosasFeas) {
      if (data.id === label) {
        fotoReturn = data;
      }
    }
    return fotoReturn;
  }

  private GetDataLindas(label: string): Foto {
    let fotoReturn: Foto;

    for (const data of this.arrayCosasLindas) {
      if (data.id === label) {
        fotoReturn = data;
      }
    }
    return fotoReturn;
  }

  public async ShowPicture(label: string, tipo: string) {
    let data: Foto = null;

    if (tipo === 'fea') {
      data = this.GetDataFeas(label);
    } else if (tipo === 'linda') {
      data = this.GetDataLindas(label);
    }

    await this.PresentModal(data);
  }

  public async PresentModal(data: Foto) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { value: data }
    });

    modal.present();
  }
}
