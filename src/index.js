// src/index.js
import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

// Importar routers (asegúrate que todos exporten default)
import usuariosRouters from './routers/usuarios.routers.js';
import areasRouter from './routers/areas.routers.js';
import centroFormacionRouter from './routers/CentroFormacion.routers.js';
import MunicipioRouters from './routers/Municipio.routers.js';
import SedesRouter from './routers/Sedes.routers.js';
import tipoSitio from './routers/tipoSitio.routers.js';
import opciones from './routers/opciones.routers.js';
import productos from './routers/productos.routers.js';
import roles from './routers/roles.routers.js';
import titulados from './routers/titulados.routers.js';
import fichaRoutes from './routers/FichasFormacion.routers.js';
import solicitudes from './routers/solicitudes.routers.js';
import entregaMaterial from './routers/entregaMaterial.routers.js';
import detalleSolicitud from './routers/detalleSolicitud.routers.js';
import SolicitudesEstadisticas from './routers/solicitudesEstadisticas.js';
import accesosRouters from './routers/accesos.routers.js';
import sitioEstadisticasRouter from './routers/sitioEstadisticas.js';
import HistorialProducto from './routers/HistorialProducto.routers.js';
import movimientoInventarioRouter from './routers/movimientoInventarioRouter.js';
import sitioRouter from './routers/Sitios.routers.js';

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(cors());

const swaggerData = JSON.parse(fs.readFileSync(path.resolve('swagger.json'), 'utf-8'));
console.log('Swagger loaded:', swaggerData);

// Rutas con sus prefijos
app.use('/api/movimientos', movimientoInventarioRouter);
app.use('/api/sitio', sitioRouter);
app.use('/api/fichas', fichaRoutes);
app.use('/api/historial-producto', HistorialProducto);
app.use('/api/sitio-estadisticas', sitioEstadisticasRouter);
app.use('/api/solicitudes-estadisticas', SolicitudesEstadisticas);
app.use('/api/titulados', titulados);
app.use('/api/solicitudes', solicitudes);
app.use('/api/entrega-material', entregaMaterial);
app.use('/api/detalle-solicitud', detalleSolicitud);
app.use('/api/roles', roles);
app.use('/api/productos', productos);
app.use('/api/opciones', opciones);
app.use('/api/areas', areasRouter);
app.use('/api/usuarios', usuariosRouters);
app.use('/api/municipios', MunicipioRouters);
app.use('/api/sedes', SedesRouter);
app.use('/api/tipos-sitio', tipoSitio);

app.use('/api/centroformacion', centroFormacionRouter);
app.use('/api/accesos', accesosRouters);

// Swagger UI (opcional si tienes archivo swagger.json y quieres exponer UI)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerData));

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
