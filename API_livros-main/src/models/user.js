'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');



  class User extends Model {
   static init(sequelize){
    super.init({
      nome: {
        type: DataTypes.STRING,
       
      },
      sobrenome: {
        type: DataTypes.STRING,
       
      },
      tel: {
        type: DataTypes.STRING,
       
      },
      senha: {
        type: DataTypes.STRING,
        
      },
      email: {
        type: DataTypes.STRING,
      },
    }, {
      sequelize,
      modelName: 'User',
      timestamps: true
    });
   }
    static associate(models) {
      this.hasMany(models.Livro, { foreignKey: 'user_id', as: 'livros'});
      this.hasMany(models.Mensagem, { foreignKey: 'user_id', as: 'mensagens'});
    }
  }

  module.exports = User;