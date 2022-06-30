const jwt		 = require('jsonwebtoken'); 						
const config 	 = require('../config/entorno.js'); 
exports.crearToken = function (oData) { 
	 
	var oResponse			  = {};
	oResponse.oAuditResponse = {};
	oResponse.oData		  = [];
    try{
		var sToken = jwt.sign( { data: JSON.stringify(oData) }, config.JWT_CLAVE, { expiresIn: config.JWT_TIEMPO_EXPIRACION });
		oResponse.oAuditResponse.iCode = 1;
		oResponse.oAuditResponse.sMessage = "OK";
		oResponse.oData = sToken;
   }catch(e){
		console.log(e);
	    oResponse.oAuditResponse.iCode = -1;
	    oResponse.oAuditResponse.sMessage = "Ocurrio un error al tratar de validar el token " + e.toString();
   }
   return oResponse;
}

exports.validarToken = function (sToken) { 
	 
	 var oResponse			  = {};
	 oResponse.oAuditResponse = {};
	 oResponse.oData		  = [];
	 
	try{
		jwt.verify(sToken, config.JWT_CLAVE, function(err, user) {
			      if (err) {
			         oResponse.oAuditResponse.iCode = 2;
			         oResponse.oAuditResponse.sMessage = "Token Expirado";
			         oResponse.oData = err;
			      } else {
			         oResponse.oAuditResponse.iCode = 1;
			         oResponse.oAuditResponse.sMessage = "OK";
			         oResponse.oData = user;
			      }
			 });  
	}catch(e){
		oResponse.oAuditResponse.iCode = -1;
        oResponse.oAuditResponse.sMessage = "Ocurrio un error al tratar de validar el token " + e.toString();
	}
	return oResponse;
}