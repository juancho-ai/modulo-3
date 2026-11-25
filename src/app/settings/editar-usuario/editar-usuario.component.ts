import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import * as Toast from 'nativescript-toast';
import { AlmacenamientoLocalService } from '../../services/almacenamiento-local.service';

@Component({
  selector: 'ns-editar-usuario',
  templateUrl: './editar-usuario.component.html'
})
export class EditarUsuarioComponent implements OnInit {
  nombreUsuarioInput: string = '';

  constructor(
    private almacenamientoService: AlmacenamientoLocalService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.nombreUsuarioInput = this.almacenamientoService.obtenerNombreUsuario();
  }

  guardarUsuario(): void {
    if (!this.nombreUsuarioInput || this.nombreUsuarioInput.trim().length < 2) {
      Toast.makeText('El nombre de usuario debe tener al menos 2 caracteres').show();
      return;
    }

    this.almacenamientoService.guardarNombreUsuario(this.nombreUsuarioInput);
    Toast.makeText('Nombre de usuario persistido en ApplicationSettings').show();
    this.routerExtensions.back();
  }

  cancelar(): void {
    this.routerExtensions.back();
  }
}
