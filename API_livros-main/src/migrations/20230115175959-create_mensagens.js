'use strict';

/** @type {import('sequelize-cli').Migration} */

const {DataTypes} = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('mensagens', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      mensagem: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      livro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'livros',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('mensagens');
    
  }
};
