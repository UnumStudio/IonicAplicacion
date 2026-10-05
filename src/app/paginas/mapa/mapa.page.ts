import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';
import * as L from 'leaflet';
import { BarraNavegacionComponent } from '../../componentes/barra-navegacion/barra-navegacion.component';
import { Lugar } from '../../models/modelos';

interface CategoriaMapa {
  etiqueta: string;
  valor: Lugar['categoria'] | 'todos';
}

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, BarraNavegacionComponent],
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements AfterViewInit, OnDestroy {
  textoBusqueda = '';

  categorias: CategoriaMapa[] = [
    { etiqueta: 'Lavaderos', valor: 'lavadero' },
    { etiqueta: 'Talleres', valor: 'taller' },
    { etiqueta: 'Estación de servicio', valor: 'estacion_servicio' },
  ];
  categoriaActiva: Lugar['categoria'] | 'todos' = 'lavadero';

  // Coordenadas de ejemplo (Buenos Aires). Reemplazar por la ubicación
  // real del usuario con @capacitor/geolocation cuando lo integren.
  lugares: Lugar[] = [
    { id: '1', nombre: 'Lavadero Norte', categoria: 'lavadero', lat: -34.6010, lng: -58.3810, direccion: 'Av. Siempre Viva 123' },
    { id: '2', nombre: 'Taller Mecánico Sur', categoria: 'taller', lat: -34.6055, lng: -58.3790, direccion: 'Calle Falsa 456' },
    { id: '3', nombre: 'YPF Centro', categoria: 'estacion_servicio', lat: -34.6035, lng: -58.3850, direccion: 'Av. Corrientes 789' },
    { id: '4', nombre: 'Lavadero Express', categoria: 'lavadero', lat: -34.6075, lng: -58.3830, direccion: 'Bv. Mitre 321' },
  ];

  private mapa!: L.Map;
  private marcadores: L.Marker[] = [];

  constructor() {
    addIcons({ searchOutline });
  }

  ngAfterViewInit(): void {
    // Se ejecuta después de que el <div id="mapa-leaflet"> ya está en el DOM
    setTimeout(() => this.inicializarMapa(), 0);
  }

  ngOnDestroy(): void {
    this.mapa?.remove();
  }

  private inicializarMapa(): void {
    this.mapa = L.map('mapa-leaflet', {
      zoomControl: false,
    }).setView([-34.603, -58.382], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(this.mapa);

    this.pintarMarcadores();
  }

  seleccionarCategoria(valor: Lugar['categoria'] | 'todos'): void {
    this.categoriaActiva = valor;
    this.pintarMarcadores();
  }

  get lugaresFiltrados(): Lugar[] {
    if (this.categoriaActiva === 'todos') {
      return this.lugares;
    }
    return this.lugares.filter((l) => l.categoria === this.categoriaActiva);
  }

  private pintarMarcadores(): void {
    if (!this.mapa) return;
    this.marcadores.forEach((m) => m.remove());
    this.marcadores = this.lugaresFiltrados.map((lugar) =>
      L.marker([lugar.lat, lugar.lng]).addTo(this.mapa).bindPopup(lugar.nombre)
    );
  }
}
