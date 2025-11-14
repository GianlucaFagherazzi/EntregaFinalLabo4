'use strict';

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Gianluca',
        surname: 'Fagherazzi',
        email: 'gian@example.com',
        dni: '12345678',
        password: '12345678'
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
