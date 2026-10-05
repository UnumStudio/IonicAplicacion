import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonContent, ModalController } from '@ionic/angular';
import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { TarjetaDocumentoComponent } from '../../componentes/tarjeta-documento/tarjeta-documento.component';
import { Vehiculo, Documento } from '../../models/modelos';
// Descomentar cuando creen el componente visor-documento como modal:
// import { VisorDocumentoComponent } from '../../componentes/visor-documento/visor-documento.component';

@Component({
  selector: 'app-vehiculo',
  standalone: true,
  imports: [CommonModule, RouterModule, IonContent, BarraNavegacionComponent, TarjetaDocumentoComponent],
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage {
  vehiculo: Vehiculo = {
    id: '1',
    marca: 'Toyota',
    modelo: 'Hilux',
    anio: 2018,
    patente: 'AE123CD',
    fotoUrl: 'assets/vehiculos/hilux.png',
  };

  documentos: Documento[] = [
    {
      id: '1',
      tipo: 'cedula',
      titulo: 'Documento',
      subtitulo: 'Cédula de identificación',
      fechaVencimiento: '12 Nov 2026',
      archivoUrl: 'assets/documentos/cedula.jpg',
      esImagen: true,
    },
    {
      id: '2',
      tipo: 'seguro',
      titulo: 'Seguro',
      subtitulo: 'Seguro Obligatorio',
      fechaVencimiento: '18 Nov 2026',
      archivoUrl: 'assets/documentos/poliza.pdf',
      esImagen: false,
    },
  ];

  constructor(private modalController: ModalController) {}

  // Patente separada en bloques para mostrarla como en la cédula: "AE 123 CD"
  get patenteFormateada(): string {
    const p = this.vehiculo.patente;
    return `${p.slice(0, 2)} ${p.slice(2, 5)} ${p.slice(5)}`;
  }

  async abrirDocumento(documento: Documento): Promise<void> {
    // Cuando tengan el componente visor-documento armado como modal,
    // lo abren así (dejo la referencia comentada arriba):
    //
    // const modal = await this.modalController.create({
    //   component: VisorDocumentoComponent,
    //   componentProps: { documento },
    // });
    // await modal.present();

    console.log('Abrir documento:', documento.titulo);
  }
}
