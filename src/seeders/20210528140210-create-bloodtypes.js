'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('bloodtypes', [{
          type: 'A+',         
     }, {
          type: 'A-', 
    }, {
          type: 'B+', 
    }, {
          type: 'B-',
    }, {
          type: 'O+',
    }, {
          type: 'O-',
    }, {
          type: 'AB+',
    }, {
          type: 'AB-',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('bloodtypes', null, {});


  }
};
