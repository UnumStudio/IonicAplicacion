import { Component, computed } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { TarjetaDocumentoComponent } from '../../componentes/tarjeta-documento/tarjeta-documento.component';
import { VehiculosService } from '../../servicios/vehiculos.service';
import { Documento } from '../../models/modelos';

@Component({
  selector: 'app-vehiculo',
  imports: [IonContent, BarraNavegacionComponent, TarjetaDocumentoComponent],
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage {
  // Vehículo que la persona marcó como activo en "Mis vehículos"
  vehiculo = this.vehiculosService.vehiculoActivo;

  // Documentos de ejemplo: todavía no hay un servicio que los guarde.
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

  // Patente separada en bloques para mostrarla como en la cédula: "AE 123 CD"
  patenteFormateada = computed(() => {
    const patente = this.vehiculo()?.patente ?? '';
    return `${patente.slice(0, 2)} ${patente.slice(2, 5)} ${patente.slice(5)}`;
  });

  constructor(private vehiculosService: VehiculosService) {}

  abrirDocumento(documento: Documento): void {
    // Pendiente: abrir el documento en un modal visor (ModalController +
    // un componente "visor-documento"). Por ahora solo queda registrado.
    console.log('Abrir documento:', documento.titulo);
  }
}
