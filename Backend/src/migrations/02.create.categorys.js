'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false}
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('category');
  }
};
