# Proyecto NativeScript + Angular + Redux + Express (Módulo 3/4)

Aplicación móvil multiplataforma en NativeScript con Angular, gestión de estado global mediante **Redux (`@ngrx/store`)**, almacenamiento persistente con **`ApplicationSettings`** y consumo HTTP hacia un servidor **Express** expuesto mediante **Ngrok**.

## Cumplimiento de requerimientos del módulo

1. **Aplicación Express con Webservice GET y filtrado por querystring**:
   - Ubicada en `backend-express/server.js` (`GET /api/articulos?q=termino`).
2. **Listado con formulario de búsquedas (caja de texto y botón) y filtrado funcional**:
   - Implementado en `src/app/search/search.component.html` y `src/app/search/search.component.ts`.
3. **Variable de configuración para la URL de Ngrok**:
   - Definida en `src/app/config/app.config.ts` (`APP_CONFIG.ngrokApiUrl`) y editable dinámicamente desde Settings con persistencia en `ApplicationSettings`.
4. **Servicio de Angular encargado de realizar la solicitud HTTP**:
   - Implementado en `src/app/services/articulos-api.service.ts` usando `HttpClient` (`NativeScriptHttpClientModule`) con parámetro querystring `q`, desacoplando la lógica HTTP de los componentes gráficos.
5. **Sección de Settings leyendo el nombre de usuario de manera persistente**:
   - Implementada en `src/app/settings/settings.component.ts` y `settings.component.html` leyendo `ApplicationSettings.getString('nombreUsuario', ...)`.
6. **Pantalla para editar y persistir el nombre de usuario con `ApplicationSettings`**:
   - Implementada en `src/app/settings/editar-usuario/editar-usuario.component.ts` y `.html` guardando mediante `ApplicationSettings.setString('nombreUsuario', ...)`.
7. **Ícono para guardar como favorito en el listado de búsqueda**:
   - Implementado en cada fila de `src/app/search/search.component.html` (`toggleFavorito(item)`).
8. **Favoritos listados en el componente de la sección `'Favoritos'`**:
   - Implementado en `src/app/favoritos/favoritos.component.ts` y `favoritos.component.html` (integrado al `RadSideDrawer`).
9. **Botón/ícono de `"Leer ahora"` en Favoritos que despacha una `Action` al Store de Redux**:
   - En `src/app/favoritos/favoritos.component.ts`, al pulsar **Leer ahora** se ejecuta `this.store.dispatch(leerAhora({ articulo }))`.
10. **Pantalla principal (`Home`) mostrando reactivamente los elementos de `"Leer ahora"` mediante `select` del Store de Redux**:
    - En `src/app/home/home.component.ts`, se suscribe reactivamente con `this.store.select(selectListaLeerAhora)` y renderiza el listado actualizado en tiempo real en `home.component.html`.
