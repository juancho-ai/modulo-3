import { ApplicationSettings } from '@nativescript/core';

export const APP_CONFIG = {
  // Variable de configuración base para la URL de Ngrok hacia el API en Express
  ngrokApiUrl: 'https://ejemplo-tunel.ngrok-free.app/api/articulos',
  storageKeys: {
    nombreUsuario: 'nombreUsuario',
    ngrokUrl: 'ngrokApiUrl',
    favoritos: 'favoritosGuardados'
  }
};

export function obtenerUrlNgrokActiva(): string {
  return ApplicationSettings.getString(APP_CONFIG.storageKeys.ngrokUrl, APP_CONFIG.ngrokApiUrl);
}
