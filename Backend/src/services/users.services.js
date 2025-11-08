import { User } from '../models/index.models.js';

export const UserService = {
  async getAll() {
    return await User.findAll({ include: ['Products', 'Accounts', 'Movements'] });
  },

  async getById(id) {
    return await User.findByPk(id, { include: ['Products', 'Accounts', 'Movements'] });
  },

  async create(data) {
    return await User.create(data);
  },

  async update(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuario no encontrado');
    return await user.update(data);
  },

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuario no encontrado');
    return await user.destroy();
  }
};

