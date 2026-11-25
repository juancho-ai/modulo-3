import { Component, OnInit } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as Toast from 'nativescript-toast';
import { Articulo } from '../models/articulo.model';
import { ArticulosApiService } from '../services/articulos-api.service';
import { AlmacenamientoLocalService } from '../services/almacenamiento-local.service';
import { obtenerUrlNgrokActiva } from '../config/app.config';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  terminoBusqueda: string = '';
  resultados: Articulo[] = [];
  cargando: boolean = false;
  urlActiva: string = '';

  constructor(
    private articulosApiService: ArticulosApiService,
    private almacenamientoService: AlmacenamientoLocalService
  ) {}

  ngOnInit(): void {
    this.urlActiva = obtenerUrlNgrokActiva();
    this.ejecutarBusqueda();
  }

  onNavigatedTo(): void {
    this.urlActiva = obtenerUrlNgrokActiva();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  // Requisito 2, 3 y 4: Formulario de búsqueda delegando la petición HTTP al Service Angular
  ejecutarBusqueda(): void {
    this.cargando = true;
    this.articulosApiService.buscarArticulos(this.terminoBusqueda).subscribe({
      next: (datos) => {
        this.resultados = datos;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        Toast.makeText('Error consultando API Express').show();
      }
    });
  }

  // Requisito 7: Ícono para guardar como favorito en el listado de búsqueda
  toggleFavorito(articulo: Articulo): void {
    const agregado = this.almacenamientoService.toggleFavorito(articulo);
    Toast.makeText(
      agregado
        ? `Guardado en Favoritos: ${articulo.titulo}`
        : `Eliminado de Favoritos: ${articulo.titulo}`
    ).show();
  }

  esFavorito(id: number): boolean {
    return this.almacenamientoService.esFavorito(id);
  }
}
