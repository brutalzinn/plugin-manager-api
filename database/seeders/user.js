'use strict';
const Utils = require('../../utils/helper')

module.exports = {
  up: async (queryInterface, Sequelize) => {

  
    const  data = [{
      id:1,
      email:"root@root.com",
      password: await Utils.generateHash("123"),
      name:"Root user",
      rank:1,
      status:true,
      created_at: new Date(),
      updated_at: new Date(),
    
    }]
    console.log("FAKE USERS CREATED: ", data.length)

    return  await queryInterface.bulkInsert('users', data);
    
  },

  down: async (queryInterface, Sequelize) => {
   
   return  await queryInterface.bulkDelete('users', null, {});
     
  }
};
