'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

const User =  require('./user');
const Mensagem =  require('./mensagens');

  class Livro extends Model {
   static init(sequelize){
    super.init({
        titulo: {
            type: DataTypes.STRING,
           
          },
          categoria: {
            type: DataTypes.STRING,
            
          },
          tel: {
            type: DataTypes.STRING,
            
          },
          descricao: {
            type: DataTypes.STRING,
           
          },
          ano_lancamento: {
            type: DataTypes.STRING,
           
          },
          autor: {
            type: DataTypes.STRING,
           
          },
          foto: {
            type: DataTypes.STRING,
            
          },
          is_reservado: {
            type: DataTypes.STRING,
           
          },
    }, {
      sequelize,
      modelName: 'Livro',
      timestamps: true
    });
   }
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'});
      this.hasMany(models.Mensagem, { foreignKey: 'livro_id', as: 'mensagens'});

    }
  }

  module.exports = Livro;