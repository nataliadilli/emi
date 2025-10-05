import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonSelect, IonSelectOption, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ApiService } from 'src/service/ApiService';
import { FormatUtil } from 'src/utils/FormatUtil';

@Component({
  selector: 'app-juros-compostos',
  templateUrl: './juros-compostos.page.html',
  styleUrls: ['./juros-compostos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonSelect, IonSelectOption, IonButtons, IonBackButton, CommonModule, FormsModule]
})
export class JurosCompostosPage implements OnInit {

  valorInicial: any;
  valorMensal: any;
  taxaJuros: any;
  periodo: number = 12;
  periodoTaxa: any = '1';
  unidadePeriodo: any = '1';

  constructor(private apiService: ApiService, private alertController: AlertController) { }

  ngOnInit() {
  }

  limparFormulario() {
    this.valorInicial = null;
    this.valorMensal = null;
    this.taxaJuros = null;
    this.periodo = 12;
    this.periodoTaxa = '1';
    this.unidadePeriodo = '1';
  }

  calcularJurosCompostos() {

    this.apiService.calcularJurosCompostos(Number(this.valorInicial), Number(this.valorMensal), Number(this.taxaJuros), Number(this.periodoTaxa), Number(this.periodo), Number(this.unidadePeriodo)).subscribe(async resultado => {

      const alert = await this.alertController.create({
        header: 'Resultado',
        message: `
          Valor inicial - R$: ${FormatUtil.formatar(Number(this.valorInicial))}
          Valor Juros - R$: ${FormatUtil.formatar(Number(resultado))}
          Valor total com juros - R$: ${FormatUtil.formatar(Number(this.valorInicial + resultado))}
        `,
        buttons: ['OK'],
        cssClass: 'custom-alert'
      });
      await alert.present();
    });

  }
}
