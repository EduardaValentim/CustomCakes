// Relative imports
const User = require('../models/User');

const UserController = {
    // INDEX - Retorna recursos - GET
    async index(request, response) {
        const users = await User.find({}, [
            'name', 'surname', 'address', 'city', 
            'genre', 'phone', 'login', 'pedidos'
        ]);

        return response.json(users);
    },

    // CREATE - Criar - POST
    async create(request, response) {
        const {
            login, pass, name, 
            surname, nickname, phone, 
            address, city, genre,
            type=0,
        } = request.body;

        const user = await User.create({
            login, pass, name, 
            surname, nickname, phone, 
            address, city, genre,
            type, pedidos:[]
        });

        return response.status(201).json(user);
    },

    // UPDATE - Atualizar - PUT
    async update(request, response) {
        const _id = request.headers.authorization;

        const user = await User.findById(_id);

        if (!user) {
            return response.status(404).json({
                error: 'O servidor não pode encontrar o recurso solicitado'
            });
        }

        const {
            login=user.login,
            pass=user.pass,
            name=user.name,
            surname=user.surname,
            nickname=user.nickname,
            phone=user.phone,
            address=user.address,
            city=user.city,
            genre=user.genre,
            pedidos=user.pedidos
        } = request.body;

        try {
            await User.updateOne({ _id }, {
                login,
                pass,
                name,
                surname,
                nickname,
                phone,
                address,
                city,
                genre,
                pedidos
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
        const _id = request.headers.authorization;

        try {
            await User.deleteOne({ _id });
        } catch (error) {
            return response.status(500).json({
                error: 'O servidor encontrou uma situação com a qual não sabe lidar'
            });
        }

        return response.status(204).send();
    }
}

module.exports = UserController;