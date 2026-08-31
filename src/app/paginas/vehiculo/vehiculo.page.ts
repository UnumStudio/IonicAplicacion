import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VehiculoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
