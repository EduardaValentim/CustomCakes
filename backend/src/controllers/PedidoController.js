//Relative imports

const User = require('../models/User');
const Pedido = require('../models/Pedido');


const PedidoController = {
    // INDEX - Retorna recursos - GET
    async index(request, response) {
        const user = request.headers.authorization;

        const pedidos = await Pedido.find({ user },[
            'date_create', 'date_delivery',
            'finalizado', 'bolos'
        ]);

        return response.json(pedidos);
    },

    // CREATE - Criar - POST
    async create(request, response) {
        let user = request.headers.authorization;
        user = await User.findById(user);

        if (!user) {
            return response.status(404).json({
                error: 'O servidor não pode encontrar o recurso solicitado'
            });
        }

        const {
            date_create, date_delivery,
            finalizado, order
        } = request.body;

        try {
            let pedido = await Pedido.create({
                user, date_create, date_delivery,
                finalizado, order, bolos:[]
            });

            user.pedidos.push(pedido);
            await user.save();

            pedido = pedido.toObject();
            pedido.user = pedido.user._id;

            return response.status(201).json(pedido);
        } catch (error) {
            return response.status(500).json({
                error: 'O servidor encontrou uma situação com a qual não sabe lidar'
            });
        }
    },

    // UPDATE - Atualizar - PUT
    async update(request, response) {
        let user = request.headers.authorization;
        const _id = request.params._id;

        user = await User.findById(user);

        if (!user) {
            return response.status(404).json({
                error: 'O servidor não pode encontrar o usario solicitado'
            });
        }

        const pedido = await Pedido.find({ _id, user });

        if (!pedido) {
            return response.status(404).json({
                error: 'O servidor não pode encontrar o pedido solicitado'
            });
        }

        const {
            date_create, date_delivery,
            finalizado, order
        } = request.body;

        try {
            await Pedido.updateOne({ _id, user }, {
                user, date_create, date_delivery,
                finalizado, order, bolos:[]
            });
        } catch (error) {
            return response.status(500).json({
                error: 'O servidor encontrou uma situação com a qual não sabe lidar'
            });
        }

        return response.status(204).send();
    },

    // DELETE - Deletar - DELETE
    async delete(request, response) {
        let user = request.headers.authorization;
        const _id = request.params._id;

        user = await User.findById(user);

        if (!user) {
            return response.status(404).json({
                error: 'O servidor não pode encontrar o recurso solicitado'
            });
        }

        try {
            await Pedido.deleteOne({ _id, user });

            const i = user.pedidos.indexOf(_id);
            user.pedidos.splice(i, 1);

            await user.save();
        } catch (error) {
            return response.status(500).json({
                error: 'O servidor encontrou uma situação com a qual não sabe lidar'
            });
        }

        return response.status(204).send();
    }
}

module.exports = PedidoController;