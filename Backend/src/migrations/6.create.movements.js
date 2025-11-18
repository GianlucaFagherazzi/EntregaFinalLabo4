'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('movements', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            productId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'products', key: 'id' }},
            quantity: { type: Sequelize.DOUBLE, allowNull: false },
            totalAmount: { type: Sequelize.DOUBLE, allowNull: false },
            date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('movements');
    }
};
