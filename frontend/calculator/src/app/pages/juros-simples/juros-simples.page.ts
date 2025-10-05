import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonBackButton, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from 'src/service/ApiService';
import { ToastController } from '@ionic/angular';
import { FormatUtil } from 'src/utils/FormatUtil';

@Component({
  selector: 'app-juros-simples',
  templateUrl: './juros-simples.page.html',
  styleUrls: ['./juros-simples.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule,
    IonBackButton, IonButtons, IonButton, IonInput, IonItem, IonSelectOption, IonSelect, IonFooter, IonLabel]
})
export class JurosSimplesPage implements OnInit {

  valorInicial: any;
  porcentagemJuro: any;
  tipoJuro: string = '1';
  periodo: any;
  tipoPeriodo: any = '1';

  constructor(private apiService: ApiService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
  }

  limparCampos() {
    this.valorInicial = null;
    this.periodo = null;
    this.porcentagemJuro = null;
    this.tipoPeriodo = '1';
    this.tipoJuro = '1';
  }

  async calcular() {

    if (this.valorInicial == null || this.valorInicial == '') {
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos antes de continuar.',
        duration: 3000,
        color: 'warning',
        position: 'top',
      });

      await toast.present();

      return;
    }

    if (this.periodo == null || this.periodo == '') {
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos antes de continuar.',
        duration: 3000,
        color: 'warning',
        position: 'top',
      });

      await toast.present();

      return;
    }

    if (this.porcentagemJuro == null || this.porcentagemJuro == '') {
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos antes de continuar.',
        duration: 3000,
        color: 'warning',
        position: 'top',
      });

      await toast.present();

      return;
    }

    // arquivo.metodo(params).subscribe(retorno(){

    this.apiService.calcularJurosSimples(this.valorInicial, this.porcentagemJuro, Number(this.tipoJuro), this.periodo, Number(this.tipoPeriodo)).subscribe(async resultado => {

      const alert = await this.alertController.create({
        header: 'Resultado',
        message: `
          Inicial - R$: ${FormatUtil.formatar(Number(this.valorInicial))}
          Juros - R$: ${FormatUtil.formatar(Number(resultado))}
          Total com juros - R$: ${FormatUtil.formatar(Number(this.valorInicial + resultado))}
        `,
        buttons: ['OK'],
        cssClass: 'custom-alert'
      });
      await alert.present();

    });
  }

}
