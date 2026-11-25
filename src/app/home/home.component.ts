import { Component, OnInit } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as Toast from 'nativescript-toast';
import { Articulo } from '../models/articulo.model';
import { selectListaLeerAhora } from '../store/lectura.selectors';
import { quitarDeLeerAhora } from '../store/lectura.actions';
import { AlmacenamientoLocalService } from '../services/almacenamiento-local.service';

@Component({
  selector: 'Home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Requisito 10: Observable conectado reactivamente al Store de Redux mediante select
  listaLeerAhora$: Observable<Articulo[]>;
  nombreUsuario: string = '';

  constructor(
    private store: Store,
    private almacenamientoService: AlmacenamientoLocalService
  ) {
    this.listaLeerAhora$ = this.store.select(selectListaLeerAhora);
  }

  ngOnInit(): void {
    this.nombreUsuario = this.almacenamientoService.obtenerNombreUsuario();
  }

  onNavigatedTo(): void {
    this.nombreUsuario = this.almacenamientoService.obtenerNombreUsuario();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  quitarLectura(id: number): void {
    this.store.dispatch(quitarDeLeerAhora({ id }));
    Toast.makeText('Elemento quitado de la cola Leer Ahora').show();
  }
}
