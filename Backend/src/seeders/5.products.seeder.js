'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('products', [
      { id: 1, name: 'Notebook Lenovo', price: 1500, stock: 10, userId: 1, categoryId: 1 },
      { id: 2, name: 'Aspiradora Philips', price: 800, stock: 5, userId: 1, categoryId: 2 }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
