'use strict';
const helper = require("../../utils/seederHelper")

module.exports = {
  up: async (queryInterface, Sequelize) => {

  
    const  data = helper.randomFilesModel(5)
    console.log("ARRAY", data)
    return  await queryInterface.bulkInsert('files', data);
    
  },

  down: async (queryInterface, Sequelize) => {
   
   return  await queryInterface.bulkDelete('files', null, {});
     
  }
};
