const express = require('express');
const Usuario = require('../models/usuario');
const {verificarToken, verificarRol} = require('../middlewares/autenticacion');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const uniqueValidator = require('mongoose-unique-validator');

const app = express();

app.get('/usuario', verificarToken, (req, res) => {

    return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        correo: req.usuario.email,

    })
    
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5

    Usuario.find({estado: true}, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
            
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            }); 
        };

        Usuario.count({estado: true}, (err, conteo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                }); 
            }
            res.json({
                ok: true,
                usuarios,
                cuantos: conteo
            });
        });
    });
});
  
app.post('/usuario', [verificarToken, verificarRol], (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            }); 
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
  
  
app.put('/usuario/:id', [verificarToken, verificarRol], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'}, (err, usuarioDB) => {
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        }); 
    };
    res.json({
        ok: true,
        usuario: usuarioDB
        });
    });
});
  
app.delete('/usuario/:id', [verificarToken, verificarRol], (req, res) => {

    let id = req.params.id;
    
    Usuario.findByIdAndUpdate(id, {estado: false},{new: true, context:'query'}, (err, usuarioInactivo) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            }); 
        };

        if( !usuarioInactivo ) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            })
        }

    res.json({
        ok: true,
        usuario: usuarioInactivo
    });

    });
});

  
  module.exports = app;