 const config		= require ('../config/config.json');
exports.generaHeaders = function (oHeader) { 
	var oResponse = {};
	oResponse.sIdTransaccion	 = oHeader.sidtransaccion;
	oResponse.sUsuario			 = oHeader.susuario;
	oResponse.sAplicacion		 = oHeader.saplicacion;
	oResponse.dFecha			 = oHeader.dfecha;
	oResponse.sTerminal			 = oHeader.sterminal; 
	oResponse.sToken			 = config.sTokenLogin;
	return oResponse;
}