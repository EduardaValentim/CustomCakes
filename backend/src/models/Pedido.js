// Imports
const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date_create: {
        type: Date,
        required: true,
        default: Date.now
    },
    date_delivery: {
        type: Date,
        required: true,
        default: Date.now
    },
    finalizado: {
        type: Boolean,
        required: true,
        default: false
    },
    bolos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bolo'
        }
    ]
});

module.exports = mongoose.model('Pedido', PedidoSchema);