// src/index.js
import express from 'express';	
import usuariosRouters from './routers/usuarios.routers.js';
import areasRouters from './routers/areas.routers.js';
import CentroFormacionRouters from './routers/CentroFormacion.routers.js';
import MunicipioRouters from './routers/Municipio.routers.js';
import SedesRouters from './routers/Sedes.routers.js';
import SitioRouters from './routers/Sitio.routers.js';
import tipoSitio from './routers/tipoSitio.routers.js';
import opciones from './routers/opciones.routers.js';
import productos from './routers/productos.routers.js';
import roles from './routers/roles.routers.js';
import titulados from './routers/titulados.routers.js';
import reportesRouter from './routers/reporteUsers.routers.js';
import solicitudes from './routers/solicitudes.routers.js';
import entregaMaterial from './routers/entregaMaterial.routers.js';
import detalleSolicitud from './routers/detalleSolicitud.routers.js';
import SolicitudesEstadisticas from './routers/solicitudesEstadisticas.js';
import accesosRouters from './routers/accesos.routers.js';
import sitioEstadisticasRouter from './routers/sitioEstadisticas.js'; 
import HistorialProducto from './routers/HistorialProducto.routers.js'
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(cors());

const swaggerData = JSON.parse(fs.readFileSync(path.resolve('swagger.json'), 'utf-8'));
console.log(swaggerData);
app.use('/api', HistorialProducto);
app.use('/api', sitioEstadisticasRouter);
app.use('/api/SolicitudesEstadisticas', SolicitudesEstadisticas);
app.use('/api/titulados', titulados);
app.use('/api/solicitudes', solicitudes);
app.use('/api/entregaMaterial', entregaMaterial);
app.use('/api/detalle-solicitud', detalleSolicitud);
app.use('/api/roles', roles);
app.use('/api/productos', productos);  
app.use('/api/opciones', opciones);
app.use('/api/areas', areasRouters); 
app.use('/api/usuarios', usuariosRouters);
app.use('/api/municipios', MunicipioRouters);
app.use('/api/sedes', SedesRouters);
app.use('/api/sitios', SitioRouters);
app.use('/api/tipositio', tipoSitio);
app.use('/api/centros-formacion', CentroFormacionRouters);
app.use('/api/reportes', reportesRouter);
app.use('/api/accesos', accesosRouters);

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
