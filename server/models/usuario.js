const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos = {
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es rol valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        unique: false,
        required: [true, 'La contrasena es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        default: 'USER_ROLE',
        type: String,
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true}, 
    google: {
        type: Boolean,
        default: false} 
});

usuarioSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: 'Ya existe otro usuario con ese {PATH} en la base de datos'});

module.exports = mongoose.model('Usuario', usuarioSchema);