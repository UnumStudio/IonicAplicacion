import { Injectable, computed, signal } from '@angular/core';
import { Gasto } from '../models/modelos';

const CLAVE_GASTOS = 'vehiculo-app:gastos';

// Gastos de ejemplo: se usan solo mientras no haya nada guardado.
const GASTOS_DEMO: Gasto[] = [
  { id: '1', categoria: 'nafta', titulo: 'Nafta', fecha: '2026-05-24', monto: 35000 },
  { id: '2', categoria: 'mantenimiento', titulo: 'Cambio de aceite', fecha: '2026-05-17', monto: 28000 },
  { id: '3', categoria: 'seguro', titulo: 'Cuota seguro', fecha: '2026-05-10', monto: 42000 },
  { id: '4', categoria: 'reparaciones', titulo: 'Cambio de pastillas de freno', fecha: '2026-04-28', monto: 49000 },
];

@Injectable({ providedIn: 'root' })
export class GastosService {
  private readonly _gastos = signal<Gasto[]>(this.cargarGastos());

  // Ordenados del más reciente al más viejo
  readonly gastos = computed(() =>
    [...this._gastos()].sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
  );

  // Todavía no se muestra en Inicio (ahí el monto es de ejemplo); queda listo para conectarlo.
  readonly totalDelMes = computed(() => {
    const ahora = new Date();
    const mesActual = ahora.getMonth();
    const anioActual = ahora.getFullYear();

    return this._gastos()
      .filter((g) => {
        const fecha = new Date(`${g.fecha}T00:00:00`); // fecha local, no UTC
        return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
      })
      .reduce((total, g) => total + g.monto, 0);
  });

  agregarGasto(datos: Omit<Gasto, 'id'>): void {
    const nuevo: Gasto = { ...datos, id: crypto.randomUUID() };
    this._gastos.update((lista) => [...lista, nuevo]);
    this.guardarGastos();
  }

  private guardarGastos(): void {
    localStorage.setItem(CLAVE_GASTOS, JSON.stringify(this._gastos()));
  }

  private cargarGastos(): Gasto[] {
    try {
      const guardado = localStorage.getItem(CLAVE_GASTOS);
      return guardado ? JSON.parse(guardado) : GASTOS_DEMO;
    } catch {
      return GASTOS_DEMO;
    }
  }
}
