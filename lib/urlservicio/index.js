 
//url de servicios
exports.servicios   = function () { 
	const oUrl = {}; 
	 
	//Servicios de Usuario 
	var sHostUsuario      	= 'http://localhost:3003';
	oUrl.sLoginUsuario	    = sHostUsuario + '/seguridad/usuario/validausuario';
	oUrl.sConsultarUsuario  = sHostUsuario + '/seguridad/usuario';
	oUrl.sCambiarClaveUsuario = sHostUsuario + '/seguridad/usuario/clave'

	var sHostUtilitario      	= 'http://localhost:5001';
	oUrl.sHostRecuperarCuenta	    = sHostUtilitario + '/ms-com-utilitario/enviaremail';
    return oUrl;
      
};