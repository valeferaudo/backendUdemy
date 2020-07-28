const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config')


//Crear servidor
const app = express();

//Base de datos
dbConnection();

//Settings
app.set('port',process.env.PORT||3001);
app.use(cors());
app.use(express.json());
//valentin
//S2EP76BDbimdHZH8

//Rutas
app.use('/api/usuarios',require('./routes/usuario.routes'));
app.use('/api/login',require('./routes/auth.routes'));

//Levantar Server
app.listen(app.get('port'),()=>{
    console.log("servido corriendo en puerto: "+ app.get('port'))
})