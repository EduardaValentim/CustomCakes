// Imports
const mongoose = require('mongoose');

const BoloSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },
    forma: {
        type: String,
        required: true
    },
    massa: {
        type: String,
        required: true
    },
    tamanho: {
        type: Number,
        required: true
    },
    recheio: [
        String
    ],
    cobertura: {
        type: String,
        required: true 
    },
    tema: [
        String
    ],
    adicional: {
        type: String,
        required: true 
    }, 
    preco: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Bolo', BoloSchema);