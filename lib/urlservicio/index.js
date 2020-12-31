 
//url de servicios
exports.servicios   = function () { 
	const oUrl = {}; 
	 
	//Servicios de Usuario 
	var sHostUsuario      	= 'http://localhost:3001';
	oUrl.sLoginUsuario	    = sHostUsuario + '/seguridad/usuario/validausuario';
 
    return oUrl;
      
};