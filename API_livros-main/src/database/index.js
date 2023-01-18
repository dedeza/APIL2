const sequelize = require('sequelize');
const dbConfig = require('../config/config');


const connection = new sequelize(dbConfig.development);





module.exports = connection;