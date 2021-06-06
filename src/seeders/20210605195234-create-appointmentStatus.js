'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkInsert('appointmentStatus', [
       {        
        status: 'AGENDADO',       
       },
       {        
        status: 'REALIZADO',       
       },
       {        
        status: 'CANCELADO',       
       },
    ], {});
     
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('appointmentStatus', null, {});

  }
};
