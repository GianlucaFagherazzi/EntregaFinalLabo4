'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('snapshots', [
      {
        id: 1,
        movementId: 1,
        buyerName: 'Gianluca Fagherazzi',
        sellerName: 'Leonardo Telez',
        productName: 'Notebook Lenovo',
        last4Tarjet: '4444',
        quantity: 1,
        amount: 1500,
        date: new Date()
      },
      {
        id: 2,
        movementId: 2,
        buyerName: 'Gianluca Fagherazzi',
        sellerName: 'Leonardo Telez',
        productName: 'Aspiradora Philips',
        last4Tarjet: '4444',
        quantity: 2,
        amount: 3000,
        date: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('snapshots', null, {});
  }
};
