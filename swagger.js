import swaggerAutogen from "swagger-autogen";


const outputFile  = './swagger.json';
const endPointsFiles = ['./src/index.js'];


const doc ={
    info:{
          title: 'API   baseproyecto',
        description : 'esta API permite llevar una gestion de datos sobre las bodegas llevadas a cabo por el centro de formacion',
    },
    host:'localhost:3100',
    schemas:['http']
      
}

swaggerAutogen() (outputFile, endPointsFiles,doc);