import express from 'express';	
import usuariosRouters from './routers/usuarios.routers.js'
import productosRouters from './routers/productos.routers.js'
import rolesRouters from './routers/roles.routers.js'
import roles_usuariosRouters from './routers/roles_usuarios.routers.js'
import opcionesRouters from './routers/opciones.routers.js'
import AccesosRouters from './routers/Accesos.routers.js'
import CentroFormacionRouters from './routers/CentroFormacion.routers.js'
import AreasRouters from './routers/Areas.routers.js'
import BodegaRouters from './routers/Bodega.routers.js'
import RegistroProductosRouters from './routers/RegistroProductos.routers.js'
import AlertaVencimientoRouters from './routers/AlertaVencimiento.routers.js'
import SolicitudesRouters from './routers/Solicitudes.routers.js'
import DetalleSolicitudRouters from './routers/DetalleSolicitud.routers.js'
import EntregaMaterialRouters from './routers/EntregaMaterial.routers.js'
import DetallesEntregaRouters from './routers/DetallesEntrega.routers.js'
import TituladosRouters from './routers/Titulado.routers.js'
import FichasFormacionRouters from './routers/FichasFormacion.router.js'
import areas_centros_formacionRouters from './routers/areas_centros_formacion.routers.js'
import CategoriaRouters from './routers/Categoria.routers.js'
import cors from 'cors';



const app = express();

app.use(express.json());

import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';




const swaggerData = JSON.parse(fs.readFileSync(path.resolve('swagger.json'), 'utf-8'));
console.log(swaggerData)

app.use(cors());
app.use("/api",usuariosRouters);
app.use("/api", productosRouters);
app.use("/api",rolesRouters,);
app.use("/api",roles_usuariosRouters);
app.use("/api",opcionesRouters,);
app.use("/api",AccesosRouters,);
app.use("/api",CentroFormacionRouters,);
app.use("/api",AreasRouters,);
app.use("/api",BodegaRouters,);
app.use("/api",RegistroProductosRouters,);
app.use("/api",AlertaVencimientoRouters,);
app.use("/api",SolicitudesRouters,);
app.use("/api",DetalleSolicitudRouters,);
app.use("/api",EntregaMaterialRouters,);
app.use("/api",DetallesEntregaRouters,);
app.use("/api",TituladosRouters,);
app.use("/api",FichasFormacionRouters,);
//*app.use("/api",usuar,);
app.use("/api",areas_centros_formacionRouters,);
app.use("/api",CategoriaRouters,);





app.listen(3500, () => {
    console.log("Servidor activo en el puerto 3500");
});