'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('movements', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
            type: { type: Sequelize.STRING, allowNull: false },
            quantity: { type: Sequelize.INTEGER, allowNull: false },
            amount: { type: Sequelize.DOUBLE, allowNull: false },
            
            userBuyerId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
            userSellerId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
            productId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'products', key: 'id' }, onDelete: 'CASCADE' },
            tarjetId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'tarjets', key: 'id' }, onDelete: 'CASCADE' }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('movements');
    }
};
