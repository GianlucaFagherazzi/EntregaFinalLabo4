'use strict';

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('movementUsers', {
            id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
            movementId: { type: Sequelize.INTEGER, allowNull: false },
            userId: { type: Sequelize.INTEGER, allowNull: false },
            accountId: { type: Sequelize.INTEGER, allowNull: false },
            tarjetId: { type: Sequelize.INTEGER, allowNull: false },
            rol: { type: Sequelize.STRING, allowNull: false }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('movementUsers');
    }
};