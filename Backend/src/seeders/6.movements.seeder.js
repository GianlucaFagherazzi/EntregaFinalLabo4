'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movements', [
      {
        id: 1,
        date: new Date(),
        type: 'PURCHASE',
        quantity: 1,
        amount: 1500,
        userId: 1,
        productId: 1,
        tarjetId: 1
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movements', null, {});
  }
};
