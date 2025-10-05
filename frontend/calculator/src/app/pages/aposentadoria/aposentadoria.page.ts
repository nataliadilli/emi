import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonInput } from '@ionic/angular/standalone';
import { ApiService } from 'src/service/ApiService';
import { FormatUtil } from 'src/utils/FormatUtil';

@Component({
  selector: 'app-aposentadoria',
  templateUrl: './aposentadoria.page.html',
  styleUrls: ['./aposentadoria.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonInput, CommonModule, FormsModule]
})
export class AposentadoriaPage implements OnInit {

  rendaMensal: any;
  patrimonioDesejado: any;
  idadeAtual: any;
  rentabilidadeAnual: any;
  valorInvestido: any;
  percentualInvestimento: any;
  idadeAposentadoria: any;
  gastoMensalAposentadoria: any;

  constructor(private apiService: ApiService, private alertController: AlertController) { }

  ngOnInit() {
  }

  limparFormulario() {
    this.rendaMensal = null;
    this.patrimonioDesejado = null;
    this.idadeAtual = 0;
    this.rentabilidadeAnual = null;
    this.valorInvestido = null;
    this.percentualInvestimento = null;
    this.idadeAposentadoria = 0;
    this.gastoMensalAposentadoria = null;
  }

  calcularAposentadoria() {

    this.apiService.calcularAposentadoria(Number(this.rendaMensal), Number(this.valorInvestido), Number(this.patrimonioDesejado), Number(this.percentualInvestimento), Number(this.idadeAtual), Number(this.idadeAposentadoria), Number(this.rentabilidadeAnual), Number(this.gastoMensalAposentadoria)).subscribe(async (resultado: any) => {

      const alert = await this.alertController.create({
        header: 'Resultado',
        message: `
          Se aposentará com - R$: ${FormatUtil.formatar(Number(resultado.patrimonioFinal))}
          Herança - R$: ${FormatUtil.formatar(Number(resultado.valorHeranca))}
          Gasto mensal - R$: ${FormatUtil.formatar(Number(resultado.gastoMensal))}
          Meta - R$: ${FormatUtil.formatar(Number(resultado.valorMeta))}
        `,
        buttons: ['OK'],
        cssClass: 'custom-alert'
      });
      await alert.present();
    });

  }

}
