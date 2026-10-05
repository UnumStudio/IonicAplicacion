import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon, IonButton } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { documentTextOutline, shieldCheckmarkOutline, cardOutline } from 'ionicons/icons';
import { Documento, TipoDocumento } from '../../models/modelos';

@Component({
  selector: 'app-tarjeta-documento',
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton],
  templateUrl: './tarjeta-documento.component.html',
  styleUrls: ['./tarjeta-documento.component.scss'],
})
export class TarjetaDocumentoComponent {
  @Input() documento!: Documento;
  // Se emite cuando tocan "Ver PDF"; la página que use esta tarjeta
  // decide cómo abrir el modal del visor (ver componente visor-documento)
  @Output() verDocumento = new EventEmitter<Documento>();

  private iconos: Record<TipoDocumento, string> = {
    cedula: 'card-outline',
    seguro: 'shield-checkmark-outline',
    rto: 'document-text-outline',
    otro: 'document-text-outline',
  };

  constructor() {
    addIcons({ documentTextOutline, shieldCheckmarkOutline, cardOutline });
  }

  get icono(): string {
    return this.iconos[this.documento.tipo];
  }

  onVerDocumento(): void {
    this.verDocumento.emit(this.documento);
  }
}
