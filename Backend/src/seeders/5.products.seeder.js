'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('products', [
      { name: 'Notebook Lenovo', description: "It's a computer" , isActive: true, price: 1500, stock: 10, userId: 2, categoryId: 1 },
      { name: 'Aspiradora Philips', description: "It doesn't work" , isActive: true, price: 800, stock: 5, userId: 1, categoryId: 2 }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
