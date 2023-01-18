'use strict';

/** @type {import('sequelize-cli').Migration} */

const {DataTypes} = require('sequelize');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('livros', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      titulo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: true
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ano_lancamento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      autor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_reservado: {
        type: DataTypes.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('livros');
    
  }
};
