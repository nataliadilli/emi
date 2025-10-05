import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: []
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open(route: string) {
    console.log('Abrindo:', route);
    // depois você cria as páginas e navega assim:
    // this.navCtrl.navigateForward(route);
  }

}
