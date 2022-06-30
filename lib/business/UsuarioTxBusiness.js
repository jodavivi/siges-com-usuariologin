const utils 					= require('../utils/utils'); 
const usuarioServiceClient		= require('../serviceclient/siges/usuarioService');   
const tokenjwt  				= require('../utils/tokenjwt');
//const msgData					= require ('../i18n/messages.json');
  
/**
 * @description Función que permite  validar el token de cambio de clave
 * @creation David Villanueva 28/06/2022
 * @update
 */
 exports.actualizarClaveUsuario = async (req, res) => { 
	var oResponse	  = {};
	oResponse.oData  = {}; 
	try { 
		var oData = req.body; 
		//Verificamos que exista los campos obligatorios
		if(!oData.sTokenCambioClave
			|| oData.sTokenCambioClave == ''){
				throw new Error(5 + "||" + "El campo TokenCambioClave es obligatorio");
		}
		//Validamos token  
		var validarTokenResponse = tokenjwt.validarToken(oData.sTokenCambioClave); 
		if(validarTokenResponse.oAuditResponse.iCode !== 1){ 
		throw new Error(  validarTokenResponse.oAuditResponse.iCode + "||" + validarTokenResponse.oAuditResponse.sMessage);
		}   
		var oUsuario = JSON.parse(validarTokenResponse.oData.data); 
		// Actualzamos la clave 
		var oUsuarioLogin			 = {};
		oUsuarioLogin.oAuditRequest  = req.headers;
		oUsuarioLogin.oAuditRequest.oInfoUsuario = {};
		oUsuarioLogin.oAuditRequest.oInfoUsuario.Id =  oUsuario.iId;
		oUsuarioLogin.oAuditRequest.oInfoUsuario = JSON.stringify(oUsuarioLogin.oAuditRequest.oInfoUsuario);
		oUsuarioLogin.oData	= {};
		oUsuarioLogin.oData.sClave = oData.sClave ;  
		var actualizarClaveUsuarioResponse	= await usuarioServiceClient.actualizarClaveUsuario(oUsuarioLogin); 
		if(actualizarClaveUsuarioResponse.iCode !== 1){
		   throw new Error(actualizarClaveUsuarioResponse.iCode + "||" + actualizarClaveUsuarioResponse.sMessage);
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