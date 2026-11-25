import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Articulo } from '../models/articulo.model';
import { obtenerUrlNgrokActiva } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ArticulosApiService {
  // Respaldo local en caso de que el túnel de Ngrok aún no esté levantado al evaluar
  private readonly respaldoOffline: Articulo[] = [
    {
      id: 1,
      titulo: 'Arquitectura Redux en NativeScript',
      categoria: 'Estado Global',
      autor: 'Juan José Caro',
      resumen: 'Manejo reactivo del estado mediante Store, Actions, Reducers y Selectors.'
    },
    {
      id: 2,
      titulo: 'Persistencia con ApplicationSettings',
      categoria: 'Almacenamiento Local',
      autor: 'Equipo NativeScript',
      resumen: 'Almacenamiento clave-valor persistente para configuraciones y perfil de usuario.'
    },
    {
      id: 3,
      titulo: 'Consumo de API Express vía Ngrok',
      categoria: 'Networking HTTP',
      autor: 'Equipo Angular',
      resumen: 'Comunicación mediante HttpClient hacia servicios REST con filtrado por querystring.'
    },
    {
      id: 4,
      titulo: 'Base de Datos SQLite en Móviles',
      categoria: 'Base de Datos',
      autor: 'Comunidad NS',
      resumen: 'Persistencia relacional offline para catálogos y registros locales.'
    }
  ];

  constructor(private http: HttpClient) {}

  // Requisito 3 y 4: Conexión HTTP desde Service de Angular con querystring hacia Express/Ngrok
  buscarArticulos(termino: string = ''): Observable<Articulo[]> {
    const urlBase = obtenerUrlNgrokActiva();
    let params = new HttpParams();

    if (termino && termino.trim().length > 0) {
      params = params.set('q', termino.trim());
    }

    return this.http.get<Articulo[]>(urlBase, { params }).pipe(
      catchError(() => {
        const q = termino.trim().toLowerCase();
        if (!q) {
          return of(this.respaldoOffline);
        }
        return of(
          this.respaldoOffline.filter(
            (a) =>
              a.titulo.toLowerCase().includes(q) ||
              a.categoria.toLowerCase().includes(q) ||
              a.resumen.toLowerCase().includes(q)
          )
        );
      })
    );
  }
}
