'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('movementUsers', [
      {
        id: 1,
        movementId: 1,
        userId: 1,
        accountId: 1,
        tarjetId: 1,
        rol: 'buyer'
      },
      {
        id: 2,
        movementId: 1,
        userId: 2,
        accountId: 2,
        tarjetId: 2,
        rol: 'seller'
      },
      {
        id: 3,
        movementId: 2,
        userId: 1,
        accountId: 1,
        tarjetId: 1,
        rol: 'buyer'
      },
      {
        id: 4,
        movementId: 2,
        userId: 2,
        accountId: 2,
        tarjetId: 2,
        rol: 'seller'
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('movementUsers', null, {});
  }
};
