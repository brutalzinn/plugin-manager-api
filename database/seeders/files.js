'use strict';
const helper = require("../../utils/seederHelper")

module.exports = {
  up: async (queryInterface, Sequelize) => {

  
    const  data = helper.randomFilesModel(30)
    console.log("FAKE FILES CREATED: ", data.length)
    return  await queryInterface.bulkInsert('files', data);
  },

  down: async (queryInterface, Sequelize) => {
   
   return  await queryInterface.bulkDelete('files', null, {});
     
  }
};
