'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tarjets', [
      { id: 1, number: 1111222233334444, balance: 50000, accountId: 1 }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tarjets', null, {});
  }
};
