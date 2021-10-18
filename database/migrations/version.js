"use strict";

const NameTable = "versions"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(NameTable, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      file_version: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sha: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      crc: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
