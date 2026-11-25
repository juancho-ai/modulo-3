import { Component, OnInit } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { RouterExtensions } from '@nativescript/angular';
import * as Toast from 'nativescript-toast';
import { AlmacenamientoLocalService } from '../services/almacenamiento-local.service';

@Component({
  selector: 'Settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  nombreUsuarioPersistente: string = '';
  urlNgrokConfigurada: string = '';

  constructor(
    private almacenamientoService: AlmacenamientoLocalService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.cargarConfiguracionLocal();
  }

  onNavigatedTo(): void {
    this.cargarConfiguracionLocal();
  }

  // Requisito 5: Lectura persistente mediante ApplicationSettings
  cargarConfiguracionLocal(): void {
    this.nombreUsuarioPersistente = this.almacenamientoService.obtenerNombreUsuario();
    this.urlNgrokConfigurada = this.almacenamientoService.obtenerUrlNgrok();
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  irAEditarUsuario(): void {
    this.routerExtensions.navigate(['/settings/editar-usuario']);
  }

  guardarUrlNgrok(): void {
    if (!this.urlNgrokConfigurada.trim()) {
      Toast.makeText('Ingresa una URL válida de Ngrok').show();
      return;
    }
    this.almacenamientoService.guardarUrlNgrok(this.urlNgrokConfigurada);
    Toast.makeText('URL de Ngrok guardada en ApplicationSettings').show();
  }
}
