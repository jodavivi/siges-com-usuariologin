const utils 					= require('../utils/utils'); 
const usuarioRxServiceClient	= require('../serviceclient/siges/usuarioRxService'); 

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
		  oResponse.iCode		= 1;
     	  oResponse.sMessage	= 'OK';
     	  oResponse.oData		= validarUsuarioLoginResponse.oData;

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
		 //Generar Link de cambiar clave

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account 
		 //var validarUsuarioLoginResponse	= await usuarioRxServiceClient.validarUsuarioLogin(oUsuarioLogin);
		 //if(validarUsuarioLoginResponse.iCode !== 1){
		 //  throw new Error(validarUsuarioLoginResponse.iCode + "||" + validarUsuarioLoginResponse.sMessage);
		// }
		 oResponse.iCode		= 1;
		  oResponse.sMessage	= 'OK';
		  //oResponse.oData		= validarUsuarioLoginResponse.oData;

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


 