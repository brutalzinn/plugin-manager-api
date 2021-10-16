"use strict";

const NameTable = "users"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(NameTable, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rank: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(NameTable);
  },
};
