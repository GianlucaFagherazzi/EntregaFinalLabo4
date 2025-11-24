'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('movementUsers', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            movementId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'movements', key: 'id' }, },
            userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' }, },
            accountId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'accounts', key: 'id' }, },
            tarjetId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'tarjets', key: 'id' }, },
            rol: { type: Sequelize.STRING, allowNull: false }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('movementUsers');
    }
};