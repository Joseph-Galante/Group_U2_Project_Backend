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
   await queryInterface.bulkInsert('businesses', [
     {
       name: `Sister Margaret''s School for Wayward Children`,
       address: 'New York City, NY',
       type: 'Bar',
       description: 'Mercenary hangout/dispatch center',
       owner: 'Patch',
       createdAt: new Date(),
       updatedAt: new Date()
     }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('businesses', null, {});
  }
};
