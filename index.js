import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';


const app = express();

db.authenticate()
    .then( () => console.log('Base de datos conectada'))
    .catch( error => console.log(error));

const port = process.env.PORT || 4000;

//establecer motor de vistas
app.set('view engine', 'pug');

//obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear= year.getFullYear();
    res.locals.nombrepagina= 'Agencia de Viajes';
    
    
    next();
});

//agregar al body parser para leer los testimoniales
app.use(express.urlencoded({extended : true}))



//agregar ruta publica
app.use(express.static('public'));

//agregar router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto http://localhost:${port}`);
});

