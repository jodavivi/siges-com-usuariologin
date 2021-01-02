 
//url de servicios
exports.servicios   = function () { 
	const oUrl = {}; 
	 
	//Servicios de Usuario 
	var sHostUsuario      	= 'http://www.consulting-tic.com:3001';
	oUrl.sLoginUsuario	    = sHostUsuario + '/seguridad/usuario/validausuario';
 
    return oUrl;
      
};