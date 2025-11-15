'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movements', [
      {
      
        date: new Date(),
        type: 'PURCHASE',
        quantity: 1,
        performedByName: 'Gianluca',
        performedByDni: '12345678',
        performedWithTarjetNumber: '1111222233334444',
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
