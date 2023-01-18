'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

  class Mensagem extends Model {
   static init(sequelize){
    super.init({
        mensagem: {
            type: DataTypes.STRING(300),
          },
         
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    }, {
      sequelize,
      modelName: 'Mensagem',
      tableName: 'mensagens',
      timestamps: true
    });
   }
    static associate(models) {
      this.belongsTo(models.Livro, { foreignKey: 'livro_id', as: 'livro'})
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user'})
    }
  }

  module.exports =  Mensagem;