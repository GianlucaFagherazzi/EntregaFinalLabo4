'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tarjets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      number: { type: Sequelize.BIGINT, allowNull: false },
      balance: { type: Sequelize.DOUBLE, allowNull: false },

      accountId: { type: Sequelize.INTEGER, references: { model: 'accounts', key: 'id' }, onDelete: 'CASCADE' }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tarjets');
  }
};
