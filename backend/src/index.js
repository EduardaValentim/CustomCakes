// Imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Relative imports
const routes = require('./routes');

// Dotenv config
dotenv.config()

// Mongoose connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// APP
const app = express();

// Config
app.use(express.json())
app.use(routes);

// Port
app.listen(process.env.PORT);
console.log('Servidor rodando na porta', process.env.PORT);