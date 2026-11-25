const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const articulos = [
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
  },
  {
    id: 5,
    titulo: 'Navegación Modular con SideDrawer',
    categoria: 'UI / UX',
    autor: 'Juan José Caro',
    resumen: 'Integración de rutas desacopladas y carga diferida en aplicaciones multiplataforma.'
  }
];

// Requisito 1: Webservice por GET con filtrado por querystring (?q=...)
app.get('/api/articulos', (req, res) => {
  const query = (req.query.q || '').toString().trim().toLowerCase();

  if (!query) {
    return res.json(articulos);
  }

  const filtrados = articulos.filter(
    (item) =>
      item.titulo.toLowerCase().includes(query) ||
      item.categoria.toLowerCase().includes(query) ||
      item.resumen.toLowerCase().includes(query)
  );

  return res.json(filtrados);
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}/api/articulos`);
});
