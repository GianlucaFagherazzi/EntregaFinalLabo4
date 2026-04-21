'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      userId: { type: Sequelize.INTEGER, allowNull: false, references: {model: 'users', key: 'id'}, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cart');
  }
};
