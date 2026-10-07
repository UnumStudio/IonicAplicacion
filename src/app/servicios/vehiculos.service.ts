import { Injectable, computed, signal } from '@angular/core';
import { Vehiculo } from '../models/modelos';

const CLAVE_VEHICULOS = 'vehiculo-app:vehiculos';
const CLAVE_ACTIVO = 'vehiculo-app:vehiculo-activo-id';

const VEHICULOS_DEMO: Vehiculo[] = [
  {
    id: '1',
    marca: 'Toyota',
    modelo: 'Hilux',
    anio: 2018,
    patente: 'AE123CD',
    fotoUrl: 'assets/vehiculos/hilux.png',
  },
];

@Injectable({ providedIn: 'root' })
export class VehiculosService {
  private readonly _vehiculos = signal<Vehiculo[]>(this.cargarVehiculos());
  private readonly _vehiculoActivoId = signal<string | null>(this.cargarActivoId());

  readonly vehiculos = this._vehiculos.asReadonly();

  // El vehículo marcado como "activo" es el que se muestra en Inicio y en
  // Vehículo Detallado. Si todavía no hay ninguno marcado (o se borró),
  // cae en el primero de la lista.
  readonly vehiculoActivo = computed<Vehiculo | undefined>(() => {
    const lista = this._vehiculos();
    const activoId = this._vehiculoActivoId();
    return lista.find((v) => v.id === activoId) ?? lista[0];
  });

  obtenerPorId(id: string): Vehiculo | undefined {
    return this._vehiculos().find((v) => v.id === id);
  }

  agregarVehiculo(datos: Omit<Vehiculo, 'id'>): Vehiculo {
    const nuevo: Vehiculo = { ...datos, id: crypto.randomUUID() };
    this._vehiculos.update((lista) => [...lista, nuevo]);
    this.guardarVehiculos();

    // Si es el primer vehículo que se agrega, lo marcamos activo directo
    if (this._vehiculos().length === 1) {
      this.seleccionarActivo(nuevo.id);
    }

    return nuevo;
  }

  actualizarVehiculo(id: string, datos: Partial<Omit<Vehiculo, 'id'>>): void {
    this._vehiculos.update((lista) =>
      lista.map((v) => (v.id === id ? { ...v, ...datos } : v))
    );
    this.guardarVehiculos();
  }

  seleccionarActivo(id: string): void {
    this._vehiculoActivoId.set(id);
    localStorage.setItem(CLAVE_ACTIVO, id);
  }

  private guardarVehiculos(): void {
    localStorage.setItem(CLAVE_VEHICULOS, JSON.stringify(this._vehiculos()));
  }

  private cargarVehiculos(): Vehiculo[] {
    try {
      const guardado = localStorage.getItem(CLAVE_VEHICULOS);
      return guardado ? JSON.parse(guardado) : VEHICULOS_DEMO;
    } catch {
      return VEHICULOS_DEMO;
    }
  }

  private cargarActivoId(): string | null {
    return localStorage.getItem(CLAVE_ACTIVO);
  }
}
