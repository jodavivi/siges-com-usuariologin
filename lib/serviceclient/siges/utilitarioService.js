const request			= require('request-promise-native');
const utilshttp 		= require('../../utils/utilshttp');
const utils		 		= require('../../utils/utils');
const serviciosurl		= require('../../urlservicio/index');
 
/**
 * @description servicio para enviar correo de recuperacion de cuenta
 * @creation David Villanueva 28/06/2022
 * @update 
 */
exports.recuperarCuenta = async function (oParam) { 
	 var oResponse			  = {};
	 oResponse.oData		  = {};
     try {  
     	var oUrls			  = serviciosurl.servicios(); 
     	var sUrlDestino		  = oUrls.sHostRecuperarCuenta;
     		var options = {
			    method: 'POST'
			    ,uri: sUrlDestino
			    ,body:oParam.oData
			    ,headers: utilshttp.generaHeaders(oParam.oAuditRequest)
			    ,json: true 
			  } 
		  var recuperarCuentaResponse =	await request(options) ; 
     	 if(recuperarCuentaResponse.oAuditResponse.iCode === 1){
     	 	oResponse.iCode		= 1;
			oResponse.sMessage	= 'OK';
     		oResponse.oData		= recuperarCuentaResponse.oData;
     	 }else{
     	 	oResponse.iCode		=  recuperarCuentaResponse.oAuditResponse.iCode;
			oResponse.sMessage	=  recuperarCuentaResponse.oAuditResponse.sMessage;
		  }
		 
     } catch (e) { 
 
         	oResponse.iCode		=  -3;
			oResponse.sMessage	=  'Ocurrio un error en el servicio cliente, Url: ' +sUrlDestino + ', Error: ' + e.toString();
	 
     } 
     return oResponse;
};
 