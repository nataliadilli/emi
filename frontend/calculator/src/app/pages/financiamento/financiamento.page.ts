import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonSelect, IonSelectOption, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ApiService } from 'src/service/ApiService';
import { FormatUtil } from 'src/utils/FormatUtil';

@Component({
  selector: 'app-financiamento',
  templateUrl: './financiamento.page.html',
  styleUrls: ['./financiamento.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonSelect, IonSelectOption, IonButtons, IonBackButton, CommonModule, FormsModule]
})
export class FinanciamentoPage implements OnInit {

  valorImovel: string = '';
  entrada: string = '';
  taxaJuros: string = '';
  prazo: any;
  periodoTaxa: string = '1';

  constructor(private apiService: ApiService, private alertController: AlertController) { }

  ngOnInit() {
  }

  limparFormulario() {
    this.valorImovel = '';
    this.entrada = '';
    this.taxaJuros = '';
    this.prazo = null;
    this.periodoTaxa = '1';
  }

  calcularFinanciamento() {

    this.apiService.calculoFinanciamento(Number(this.valorImovel), Number(this.entrada), Number(this.taxaJuros), Number(this.periodoTaxa), Number(this.prazo)).subscribe(async (resultado: any) => {

      const alert = await this.alertController.create({
        header: 'Resultado',
        message: `
          Valor mensal - R$: ${FormatUtil.formatar(Number(resultado.valorMensal))}
          Valor total - R$: ${FormatUtil.formatar(Number(resultado.valorTotal))}
          Valor juros - R$: ${FormatUtil.formatar(Number(resultado.juros))}
        `,
        buttons: ['OK'],
        cssClass: 'custom-alert'
      });
      await alert.present();
    });

  }

}
