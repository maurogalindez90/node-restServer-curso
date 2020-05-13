// ==============
//    PUERTO
// ==============

process.env.PORT = process.env.PORT || 3000;

// ==============
//    ENTORNO
// ==============

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ==============
// VENCIMIENTO DEL TOKEN
// ==============

//60 segs por 60 minutos por 24 horas por 30 dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ==============
// SEMILLA DE AUTENTICACION
// ==============

process.env.SEED = process.env.SEED || 'secret-desarrollo';

// ==============
// Google CLIENT_ID
// ==============

process.env.CLIENT_ID = process.env.CLIENT_ID || '867449844410-scpuoulh7gdut75vm6kf1e8l62f18hgb.apps.googleusercontent.com';

// ==============
//  BASE DE DATOS
// ==============

let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
