const express = require('express');
const routes = require('./routes');
const utils = require('./utils/utils'); 
const bodyParser = require('body-parser'); 
var cors		= require('cors');  
 
//crea un app de express
const app = express(); 
app.use(cors());
 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json()) 
 
//Inicia Routes
app.use('/ms-com-usuariologin/',  routes());
 
//Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 6010;

app.listen(port, host, () => {
    console.log('Servidor funcionando correctamente');
});