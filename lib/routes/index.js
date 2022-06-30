const express = require('express');
const router = express.Router(); 

const usuarioRxBusiness       = require('../business/UsuarioRxBusiness');    
const usuarioTxBusiness       = require('../business/UsuarioTxBusiness'); 

module.exports = function(){ 
    router.post('/autenticacion' , usuarioRxBusiness.validaUsuarioLogin); 
    router.post('/recuperar' , usuarioRxBusiness.recuperarCuenta);
    router.post('/recuperar/validartoken' , usuarioRxBusiness.validarTokenCambioClave);    
    router.put('/recuperar/actualizarclave' , usuarioTxBusiness.actualizarClaveUsuario);
    return router;
}

