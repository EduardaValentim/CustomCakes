/**
 * Request: Objeto com os dados que vem do frontend
 *  - Body: 
 *      Informações grandes e que possuem estruturação.
 *      Uso na criação ou alteração de um recurso.
 * 
 *      ~ request.body
 * 
 *  - Query Params
 *      Informações pequenas e/ou complementares.
 *      Uso para paginação, filtragem, ordanação, etc
 *      
 *      ~ request.query
 * 
 *  - Head
 *      Informações pequenas, geralmente relacionadas a acesso.
 *      Uso Informações/Código de acesso/Tokens/Ids
 *      
 *      ~ request.headers
 * 
 *  - Route Params
 *      Identificar recurso.
 *      Usado para remover ou alterar um recurso
 * 
 *      ~ request.params
 * 
 * Response: Objeto que usamos para envio de informações para o frontend
 */

// Imports
const { Router } = require('express');

// Relative imports
const UserController = require('./controllers/UserController');
const PedidoController = require('./controllers/PedidoController');
const BoloController = require('./controllers/BoloController');

// Routes
const routes = Router();

// GET.help
routes.get('/help/', function (request, response) {
    return response.json({
        title: "Custom Cakes",
        desc: "Site para encomendas de bolos",
        author: "Eduarda Cristina Valentim"
    });
});

// User
routes.get('/users/', UserController.index);
routes.post('/users/', UserController.create);
routes.put('/users/', UserController.update);
routes.delete('/users/', UserController.delete);

// Pedido
routes.get('/pedidos/', PedidoController.index);
routes.post('/pedidos/', PedidoController.create);
routes.put('/pedidos/:_id', PedidoController.update);
routes.delete('/pedidos/:_id', PedidoController.delete);

// Bolo
routes.get('/bolos/:pedido', BoloController.index);
routes.post('/bolos/:pedido', BoloController.create);
routes.put('/bolos/:pedido/:_id', BoloController.update);
routes.delete('/bolos/:pedido/:_id', BoloController.delete);

module.exports = routes;