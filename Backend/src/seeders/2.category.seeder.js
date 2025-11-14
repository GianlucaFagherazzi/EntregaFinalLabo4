'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('category', [
      { name: 'Tecnología' },
      {name: 'Electrodomésticos' }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('category', null, {});
  }
};
