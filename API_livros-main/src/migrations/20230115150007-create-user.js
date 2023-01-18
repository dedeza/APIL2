'use strict';
/** @type {import('sequelize-cli').Migration} */


const {DataTypes} = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users',{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: true
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};