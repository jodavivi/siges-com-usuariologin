require('dotenv').config({path:process.env.NODE_ENV +'.env'});  
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST,
    PORT: process.env.PORT
  }