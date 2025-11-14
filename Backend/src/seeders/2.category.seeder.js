'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('category', [
      { id: 1, name: 'Tecnología' },
      { id: 2, name: 'Electrodomésticos' }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('category', null, {});
  }
};
