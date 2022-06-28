const express = require('express');
const router = express.Router(); 

const usuarioRxBusiness       = require('../business/UsuarioRxBusiness');    

module.exports = function(){ 
    router.post('/autenticacion' , usuarioRxBusiness.validaUsuarioLogin); 
    router.post('/recuperar' , usuarioRxBusiness.recuperarCuenta);    
    return router;
}

