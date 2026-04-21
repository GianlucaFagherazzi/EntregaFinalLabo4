'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('accounts', [
      { cbu: '123123123123', userId: 1, isDefault: true },
      { cbu: '456456456456', userId: 2, isDefault: true  }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('accounts', null, {});
  }
};
