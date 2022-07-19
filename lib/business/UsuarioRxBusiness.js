const utils 					= require('../utils/utils'); 
const usuarioRxServiceClient	= require('../serviceclient/siges/usuarioService'); 
const utilitarioRxServiceClient	= require('../serviceclient/siges/utilitarioService');  
const config 					= require('../config/entorno.js'); 
const tokenjwt  				= require('../utils/tokenjwt');
//const msgData					= require ('../i18n/messages.json');
/**
 * @description Función que permite  la validacion de los usuarios
 * @creation David Villanueva 13/12/2020
 * @update
 */
exports.validaUsuarioLogin = async (req, res) => { 
	 var oResponse	  = {};
	 oResponse.oData  = {}; 
     try { 
	     //Consultamos los datos del usuario en BD
	     var oUsuarioLogin			 = {};
		 oUsuarioLogin.oAuditRequest = req.headers;
		 oUsuarioLogin.oData 		 = req.body; 
     	 var validarUsuarioLoginResponse	= await usuarioRxServiceClient.validarUsuarioLogin(oUsuarioLogin);
     	 if(validarUsuarioLoginResponse.iCode !== 1){
			throw new Error(validarUsuarioLoginResponse.iCode + "||" + validarUsuarioLoginResponse.sMessage);
		  }
		  var oUsuarioValidado = validarUsuarioLoginResponse.oData;
		  //Generar Link de cambiar clave 
		 
		var oToken = oUsuarioValidado.Datos; 
		 var crearTokenResponse = tokenjwt.crearToken(oToken); 
		 if(crearTokenResponse.oAuditResponse.iCode !== 1){ 
			throw new Error(  crearTokenResponse.oAuditResponse.iCode + "||" + crearTokenResponse.oAuditResponse.sMessage);
		 }  
		 var sToken = crearTokenResponse.oData;

		  var oDataToken 		= {};
		  oDataToken.Token 		= sToken;
		  oDataToken.Accesos 	= oUsuarioValidado.Accesos;
		  oDataToken.Empresa	= oUsuarioValidado.Empresas;
		  oResponse.iCode		= 1;
     	  oResponse.sMessage	= 'OK';
     	  oResponse.oData		= oDataToken;

     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 		= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	=  "Ocurrio un error en el proceso: " + e.toString(); 
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     
     res.json(oResponse) 
      
};

/**
 * @description Función que permite  crear un link para recuperar cuenta
 * @creation David Villanueva 26/06/2022
 * @update
 */
 exports.recuperarCuenta = async (req, res) => { 
	var oResponse	  = {};
	oResponse.oData  = {}; 
	try { 
		//Verificamos que exista el campo sUsuario 
		if(!req.body.sUsuario 
			|| req.body.sUsuario == ''){
				throw new Error(5 + "||" + "El campo usuario es obligatorio");
			}
		//Consultamos los datos del usuario en BD
		var oUsuarioLogin			 = {};
		oUsuarioLogin.oAuditRequest = req.headers;
		oUsuarioLogin.oData 		 = req.body;  
		oUsuarioLogin.oData.iCodEstadoUsuario = 1; //Usuario Activo
		var consultarUsuarioResponse	= await usuarioRxServiceClient.consultarUsuario(oUsuarioLogin);
	
		if(consultarUsuarioResponse.iCode !== 1){
		   throw new Error(consultarUsuarioResponse.iCode + "||" + consultarUsuarioResponse.sMessage);
		 }

		// var sToken = jwt.sign( { data: JSON.stringify(oNewusuario) }, config.claveJwt, { expiresIn: config.tiempoExpiracion });		

		 var oUsuarioValidado = consultarUsuarioResponse.oData[0];
 		//Generar Link de cambiar clave 
		 var oLink 			= {};
		 oLink.iId 			= oUsuarioValidado.Id;
		 oLink.sUsuario 	= oUsuarioValidado.Usuario;
		 oLink.sNombre 		= oUsuarioValidado.Nombre;
		 oLink.sApellido 	= oUsuarioValidado.Apellido;
		 oLink.sEmail 		= oUsuarioValidado.Email;
		 var crearTokenResponse = tokenjwt.crearToken(oLink); 
		 if(crearTokenResponse.oAuditResponse.iCode !== 1){ 
			throw new Error(  crearTokenResponse.oAuditResponse.iCode + "||" + crearTokenResponse.oAuditResponse.sMessage);
		 }  
		 var sToken = crearTokenResponse.oData;
		 // Enviamos correo para restablecer cuenta 
		 var oCuenta			 = {};
		 oCuenta.oAuditRequest 	= req.headers;
		 oCuenta.oData 		 		= {};
		 oCuenta.oData.sCorreo 		= oUsuarioValidado.Email;
		 oCuenta.oData.sAsunto		= "Recuperación de Cuenta!";
		 oCuenta.oData.sTemplate	= "email_recuperar_clave";
		 oCuenta.oData.oContexto   	= {};
		 oCuenta.oData.oContexto.nombre = oUsuarioValidado.Nombre + " " + oUsuarioValidado.Apellido;
		 oCuenta.oData.oContexto.link	= config.PATH_CAMBIA_CLAVE +"/siges-zeus-login/#/changepass?sToken=" + sToken;

		 var recuperarCuentaResponse	= await utilitarioRxServiceClient.recuperarCuenta(oCuenta);
		 if(recuperarCuentaResponse.iCode !== 1){
		   throw new Error(recuperarCuentaResponse.iCode + "||" + recuperarCuentaResponse.sMessage);
		 }
		
		 oResponse.iCode		= 1;
		  oResponse.sMessage	= 'OK';
		  //oResponse.oData		= validarUsuarioLoginResponse.oData;

	} catch (e) {
		console.log(e);
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 		= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	=  "Ocurrio un error en el proceso: " + e.toString(); 
	   } 
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	
	res.json(oResponse) 
	 
};


/**
 * @description Función que permite  validar el token de cambio de clave
 * @creation David Villanueva 28/06/2022
 * @update
 */
 exports.validarTokenCambioClave = async (req, res) => { 
	var oResponse	  = {};
	oResponse.oData  = {}; 
	try { 
		var oData = req.body;
		//Verificamos que exista el campo sTokenCambioClave 
		if(!oData.sTokenCambioClave
			|| oData.sTokenCambioClave == ''){
				throw new Error(5 + "||" + "El campo TokenCambioClave es obligatorio");
		}
		//Validamos token  
		var validarTokenResponse = tokenjwt.validarToken(oData.sTokenCambioClave); 
		if(validarTokenResponse.oAuditResponse.iCode !== 1){ 
		throw new Error(  validarTokenResponse.oAuditResponse.iCode + "||" + validarTokenResponse.oAuditResponse.sMessage);
		}  
		 oResponse.iCode		= 1;
		 oResponse.sMessage		= 'OK'; 
		  //oResponse.oData		= validarUsuarioLoginResponse.oData;

	} catch (e) {
		console.log(e);
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 		= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	=  "Ocurrio un error en el proceso: " + e.toString(); 
	   } 
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	
	res.json(oResponse) 
	 
};