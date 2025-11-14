'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('accounts', [
      { id: 1, cbu: '123123123123', userId: 1 }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
