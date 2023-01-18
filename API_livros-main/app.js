const express = require('express');
const app = express();
const routePublic = require('./src/routes/public');
const routeAuth = require('./src/routes/auth');
const morgan = require('morgan');
const connection = require('./src/database');
const User = require('./src/models/user');
const Livro = require('./src/models/livros');
const Mensagem = require('./src/models/mensagens');

const bodyParser = require('body-parser');

connection.sync().then(()=> console.log('banco conectado!'));

User.init(connection);
Livro.init(connection);
Mensagem.init(connection);
User.associate(connection.models);
Livro.associate(connection.models);
Mensagem.associate(connection.models);



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, DELETE, GET, POST, PATCH');
        res.status(200).send({});
    }

    next();
});

app.use("/", routePublic);
app.use("/auth", routeAuth);



module.exports = app;