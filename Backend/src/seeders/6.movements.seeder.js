'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movements', [
      {
        date: new Date(),
        quantity: 1,
        totalAmount: 1500,
        productId: 1,
      },
      {
        date: new Date(),
        quantity: 2,
        totalAmount: 3000,
        productId: 2,
      },
      
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movements', null, {});
  }
};
