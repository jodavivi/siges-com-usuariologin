 
//url de servicios
exports.servicios   = function () { 
	const oUrl = {}; 
	 
	//Servicios de Usuario 
	var sHostUsuario      	= 'http://localhost:3003';
	oUrl.sLoginUsuario	    = sHostUsuario + '/seguridad/usuario/validausuario';
	oUrl.sConsultarUsuario  = sHostUsuario + '/seguridad/usuario';
 
    return oUrl;
      
};