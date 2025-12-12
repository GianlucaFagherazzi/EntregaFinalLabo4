'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tarjets', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      number: { type: Sequelize.STRING(19), allowNull: false },
      balance: { type: Sequelize.DOUBLE, allowNull: false },
      accountId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'accounts', key: 'id' }},
      isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
      
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tarjets');
  }
};
