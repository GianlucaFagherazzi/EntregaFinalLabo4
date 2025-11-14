'use strict';

import bcrypt from 'bcryptjs';

export default {
  async up(queryInterface) {
    //Hasheo la contrasseña del usuario semilla
    const hashedPassword = await bcrypt.hash('12345678', 10);
    await queryInterface.bulkInsert('users', [
      {
        name: 'Gianluca',
        surname: 'Fagherazzi',
        email: 'gian@example.com',
        dni: "12345678",
        password: hashedPassword
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
