'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      description: { type: Sequelize.STRING, allowNull: true },
      name: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.DOUBLE, allowNull: false },
      stock: { type: Sequelize.DOUBLE, allowNull: false },
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true },

      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
      categoryId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'category', key: 'id' }, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('products');
  }
};
