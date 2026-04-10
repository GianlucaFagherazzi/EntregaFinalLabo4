'use strict';

import bcrypt from 'bcryptjs';

export default {
  async up(queryInterface) {
    //Hasheo la contrasseña del usuario semilla
    const hashedPassword = await bcrypt.hash('12345678', 10);
    const hashedPassword2 = await bcrypt.hash('87654321', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Gianluca',
        surname: 'Fagherazzi',
        email: 'gian@example.com',
        dni: "12345678",
        password: hashedPassword,
        role: 'ADMIN'
      },
      {
        name: 'Leonardo',
        surname: 'Telez',
        email: 'Leo@example.com',
        dni: "87654321",
        password: hashedPassword2,
        role: 'USER'
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
