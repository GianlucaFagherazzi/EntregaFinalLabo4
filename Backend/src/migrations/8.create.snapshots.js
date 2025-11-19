'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('snapshots', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            movementId: { type: Sequelize.INTEGER, allowNull: false },
            buyerName: { type: Sequelize.STRING, allowNull: false },
            sellerName: { type: Sequelize.STRING, allowNull: false },
            productName: { type: Sequelize.STRING, allowNull: false },
            last4Tarjet: { type: Sequelize.STRING(4), allowNull: false },
            quantity: { type: Sequelize.DOUBLE, allowNull: false },
            amount: { type: Sequelize.DOUBLE, allowNull: false },
            date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW}
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('snapshots');
    }
};