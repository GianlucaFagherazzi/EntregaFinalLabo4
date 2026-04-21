'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartItems', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },

      cartId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'cart', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      productId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }

    });

    // Evita productos duplicados en el carrito
    await queryInterface.addConstraint('cartItems', {
      fields: ['cartId', 'productId'],
      type: 'unique',
      name: 'unique_product_per_cart'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cartItems');
  }
};