'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      cbu: { type: Sequelize.STRING, allowNull: false },

      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('accounts');
  }
};
