import express from 'express';	
import usuariosRouters from './routers/usuarios.routers.js'
import areasRouters from './routers/areas.routers.js'
import CentroFormacionRouters from './routers/CentroFormacion.routers.js'
import MunicipioRouters from './routers/Municipio.routers.js'
import SedesRouters from './routers/Sedes.routers.js'
import SitioRouters from './routers/Sitio.routers.js'
import tipoSitio from './routers/tipoSitio.routers.js'
import cors from 'cors';



const app = express();

app.use(express.json());

import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';




const swaggerData = JSON.parse(fs.readFileSync(path.resolve('swagger.json'), 'utf-8'));
console.log(swaggerData)

app.use(cors());
app.use('/api', areasRouters); 
app.use("/api",usuariosRouters);
app.use("/api", MunicipioRouters);
app.use("/api",SedesRouters,);
app.use("/api",SitioRouters);
app.use("/api",tipoSitio,);
app.use("/api",CentroFormacionRouters);





app.listen(3500, () => {
    console.log("Servidor activo en el puerto 3500");
});