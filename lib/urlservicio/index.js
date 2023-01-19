 
//url de servicios
exports.servicios   = function () { 
	const oUrl = {}; 
	 
	//Servicios de Usuario
	var sHostApiGatewayMulticanal      	= 'http://localhost:1001';
	oUrl.sLoginUsuario	    = sHostApiGatewayMulticanal + '/api-gateway-multicanal/seguridad/usuario/validausuario';
	oUrl.sConsultarUsuario  = sHostApiGatewayMulticanal + '/api-gateway-multicanal/seguridad/usuario';
	oUrl.sCambiarClaveUsuario = sHostApiGatewayMulticanal + '/api-gateway-multicanal/seguridad/usuario/clave'

	//Servicios de utilitario
	oUrl.sHostRecuperarCuenta	    = sHostApiGatewayMulticanal + '/api-gateway-multicanal/ms-com-utilitario/enviaremail';
    return oUrl;
      
};