const jwt = require('jsonwebtoken');

// ==============
//    VERIFICAR TOKEN
// ==============

let verificarToken = (req, res, next) => {  
    let token = req.get('token');

    jwt.verify(token, process.env.SEED,(err, decoded) => {
        
        if(err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();

    });
};

let verificarRol = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok:false,
            err: {
                message: `El rol que usted posee no esta autorizado para la operacion que intenta realizar` }
        })
    }

}


module.exports = {
    verificarToken,
    verificarRol
}