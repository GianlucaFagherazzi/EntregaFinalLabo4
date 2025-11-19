'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movements', [
      {
        date: new Date(),
        quantity: 1,
        totalAmount: 1500,
        productId: 1,
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movements', null, {});
  }
};
