import { Component, OnInit } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Toast from 'nativescript-toast';
import { Articulo } from '../models/articulo.model';
import { AlmacenamientoLocalService } from '../services/almacenamiento-local.service';
import { leerAhora } from '../store/lectura.actions';

@Component({
  selector: 'ns-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  // Requisito 8: Listado de favoritos guardados
  favoritos$: Observable<Articulo[]>;

  constructor(
    private almacenamientoService: AlmacenamientoLocalService,
    private store: Store
  ) {
    this.favoritos$ = this.almacenamientoService.favoritos$;
  }

  ngOnInit(): void {}

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  // Requisito 9: Botón/ícono "Leer ahora" que despacha una Action al Store de Redux
  onLeerAhoraTap(articulo: Articulo): void {
    this.store.dispatch(leerAhora({ articulo }));
    Toast.makeText(`Enviado a 'Leer ahora' (Redux Store): ${articulo.titulo}`).show();
  }

  quitarFavorito(articulo: Articulo): void {
    this.almacenamientoService.toggleFavorito(articulo);
    Toast.makeText(`Quitado de Favoritos`).show();
  }
}
