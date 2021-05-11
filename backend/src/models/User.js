// Imports
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        requerid: true
    },
    nickname: {
        type: String,
    },
    genre: {
        type: String
    },
    address: {
        type: String,
        requirid: true,
    },
    city: {
        type: String,
        requerid: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    type: {
        type: Number,
        required: true,
        default: 0
    },
    pedidos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pedido'
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);