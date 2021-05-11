// Relative imports
const Pedido = require('../models/Pedido');
const Bolo = require('../models/Bolo');
const User = require('../models/User');

const BoloController = {
    // INDEX - Retorna recursos - GET
    async index(request, response) {
        const user = request.headers.authorization;
        const pedido = request.params.pedido;

        const bolos = await Bolo.find({pedido, user},[
            'forma', 'massa', 'tamanho', 'recheio', 'cobertura',
            'tema', 'adicional', 'preco']);

        if (!bolos) {
            return response.status(401).json({
                error: 'Recurso não encontrado'
            })
        }

        return response.json(bolos);
    },

    // CREATE - Criar - POST
    async create(request, response) {
        const user = request.headers.authorization;
        const _id = request.params.pedido;

        const pedido = await Pedido.findOne({ _id, user });

        if (!pedido) {
            return response.status(401).json({
                error: 'Recurso não encontrado'
            })
        }

        const {
            forma, massa, tamanho, recheio, cobertura,
            tema, adicional, preco
        } = request.body;

        try {
            const bolo = await Bolo.create({
                user, pedido, forma, massa, 
                tamanho, recheio, cobertura,
                tema, adicional, preco
            });

            pedido.bolos.push(bolo);
            await pedido.save();

            return response.status(201).json(bolo);
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                error: 'Não foi possível criar este recurso'
            });
        }
    },

    // UPDATE - Atualizar - PUT
    async update(request, response) {
		const user = request.headers.authorization;
		const pedido = request.params.pedido;
		const _id = request.params._id;
		
		const bolo = await Bolo.findOne({ _id, user, pedido });
        if (!bolo) {
            return response.status(401).json({
                error: 'Recurso não encontrado'
            })
        }
		
		const {
            forma, massa, tamanho, recheio, cobertura,
            tema, adicional, preco
        } = request.body;
		
		try {
			await Bolo.updateOne({ _id, user }, {
				forma, massa, tamanho, recheio, cobertura,
                tema, adicional, preco
			});
		} catch (error) {
			return response.status(403).json({
				error: 'Permissão negada'
			});
		}
		
		
        return response.status(204).send();
    },

    // DELETE - Deletar - DELETE
    async delete(request, response) {
        let user = request.headers.authorization;
		let pedido = request.params.pedido;
		const _id = request.params._id;
		
		user = await User.findById(user);
		
		if (!user) {
            return response.status(401).json({
                error: 'O recurso usuário não foi encontrado'
            })
        }
		
        pedido = await Pedido.findOne({ _id, user });

        if (!pedido) {
            return response.status(401).json({
                error: 'O recurso pedido não foi encontrado'
            })
        }
		
		try {
			await Bolo.deleteOne({ _id });
			
			pedido.bolos.splice(pedido.bolos.indexOf(_id), 1);
			await pedido.save();
		} catch (error) {
			return response.status(500).json({
                error: 'Não foi possível deletar este recurso'
            });
        }

        return response.status(204).send();
    }
};

module.exports = BoloController;