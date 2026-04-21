'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tarjets', [
      { number: "1111222233334444", balance: 50000, accountId: 1, isDefault: true  },
      { number: "5555666677778888", balance: 30000, accountId: 2, isDefault: true  }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tarjets', null, {});
  }
};
