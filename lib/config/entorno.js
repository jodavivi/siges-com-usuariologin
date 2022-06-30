require('dotenv').config({path:process.env.NODE_ENV +'.env'});  
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    CLAVE_CRIPTO: process.env.CLAVE_CRIPTO,
    JWT_CLAVE: process.env.JWT_CLAVE,
    JWT_TIEMPO_EXPIRACION: process.env.JWT_TIEMPO_EXPIRACION,
    PATH_CAMBIA_CLAVE: process.env.PATH_CAMBIA_CLAVE
  }
 