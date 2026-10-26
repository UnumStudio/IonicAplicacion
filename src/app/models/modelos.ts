export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  // Mock de autenticación local: NUNCA guardar contraseñas así en un
  // backend real. Esto es solo para probar el flujo de login/registro
  // sin servidor todavía.
  password: string;
}

export type TipoCombustible = 'Nafta' | 'Diesel' | 'GNC' | 'Híbrido' | 'Eléctrico';

export interface Vehiculo {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  patente: string;
  fotoUrl: string;
  // Datos opcionales: se muestran en la tarjeta de "Mis vehículos".
  // Son opcionales para no romper vehículos guardados antes de agregarlos.
  traccion?: string; // Ej: '4x2', '4x4'
  combustible?: TipoCombustible;
  nivelCombustible?: number; // Porcentaje del tanque, de 0 a 100
  proximoServiceKm?: number; // Kilometraje en el que toca el próximo service
}

export type CategoriaGasto = 'nafta' | 'reparaciones' | 'seguro' | 'mantenimiento' | 'otro';

export interface Gasto {
  id: string;
  categoria: CategoriaGasto;
  titulo: string;
  fecha: string; // Formato ISO (AAAA-MM-DD)
  monto: number;
}

export type TipoDocumento = 'cedula' | 'seguro' | 'rto' | 'otro';

export interface Documento {
  id: string;
  tipo: TipoDocumento;
  titulo: string;
  subtitulo: string;
  fechaVencimiento?: string;
  archivoUrl: string; // imagen o pdf
  esImagen: boolean;
}

export interface Lugar {
  id: string;
  nombre: string;
  categoria: 'lavadero' | 'taller' | 'estacion_servicio';
  lat: number;
  lng: number;
  direccion: string;
  telefono?: string;
  calificacion?: number;
}
