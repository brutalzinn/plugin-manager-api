"use strict";

const NameTable = "files"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(NameTable, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      repo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(NameTable);
  },
};
