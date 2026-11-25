import { Injectable } from '@angular/core';
import { ApplicationSettings } from '@nativescript/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Articulo } from '../models/articulo.model';
import { APP_CONFIG } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoLocalService {
  private favoritosSubject: BehaviorSubject<Articulo[]>;
  public favoritos$: Observable<Articulo[]>;

  constructor() {
    const iniciales = this.leerFavoritosDesdeStorage();
    this.favoritosSubject = new BehaviorSubject<Articulo[]>(iniciales);
    this.favoritos$ = this.favoritosSubject.asObservable();
  }

  // Requisitos 5 y 6: Leer y guardar nombre de usuario con ApplicationSettings
  obtenerNombreUsuario(): string {
    return ApplicationSettings.getString(
      APP_CONFIG.storageKeys.nombreUsuario,
      'Juan José Caro'
    );
  }

  guardarNombreUsuario(nuevoNombre: string): void {
    ApplicationSettings.setString(APP_CONFIG.storageKeys.nombreUsuario, nuevoNombre.trim());
  }

  obtenerUrlNgrok(): string {
    return ApplicationSettings.getString(
      APP_CONFIG.storageKeys.ngrokUrl,
      APP_CONFIG.ngrokApiUrl
    );
  }

  guardarUrlNgrok(nuevaUrl: string): void {
    ApplicationSettings.setString(APP_CONFIG.storageKeys.ngrokUrl, nuevaUrl.trim());
  }

  // Requisitos 7 y 8: Gestión persistente de Favoritos
  private leerFavoritosDesdeStorage(): Articulo[] {
    const raw = ApplicationSettings.getString(APP_CONFIG.storageKeys.favoritos, '[]');
    try {
      return JSON.parse(raw) as Articulo[];
    } catch {
      return [];
    }
  }

  private persistirFavoritos(lista: Articulo[]): void {
    ApplicationSettings.setString(APP_CONFIG.storageKeys.favoritos, JSON.stringify(lista));
    this.favoritosSubject.next(lista);
  }

  obtenerFavoritos(): Articulo[] {
    return this.favoritosSubject.value;
  }

  esFavorito(id: number): boolean {
    return this.favoritosSubject.value.some((item) => item.id === id);
  }

  toggleFavorito(articulo: Articulo): boolean {
    const actuales = this.favoritosSubject.value;
    const existe = actuales.some((item) => item.id === articulo.id);

    if (existe) {
      const filtrados = actuales.filter((item) => item.id !== articulo.id);
      this.persistirFavoritos(filtrados);
      return false;
    } else {
      this.persistirFavoritos([articulo, ...actuales]);
      return true;
    }
  }
}
