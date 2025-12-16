
import { User, Product, Account } from '../models/index.models.js';
import { AppError } from '../utils/app.error.js';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helpers de validación
async function validateUniqueEmail(email, excludeId = null) {
  const where = { email };
  if (excludeId) where.id = { [Op.ne]: excludeId };

  const exists = await User.findOne({ where });
  if (exists) throw new AppError(`El email "${email}" ya está registrado`, 409);
}

async function validateUniqueDni(dni, excludeId = null) {
  const where = { dni };
  if (excludeId) where.id = { [Op.ne]: excludeId };

  const exists = await User.findOne({ where });
  if (exists) throw new AppError(`El DNI "${dni}" ya está registrado`, 409);
}

// Helper para hashear contraseñas
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Helper para generar JWT
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
}

export const UserService = {
  async getAll() {
    try {
      return await User.findAll()
    } catch (error) {
      throw new AppError('Error al obtener usuarios', 500, error);
    }
  },

  async getById(id) {
    try {
      const user = await User.findByPk(id, {
        where: { isActive: true }
      });
      if (!user) throw new AppError('Usuario no encontrado', 404);
      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener el usuario', 500, error);
    }
  },

  async getByEmail(email) {
    try {
      const user = await User.findOne({ where: { email, isActive: true } });
      if (!user) throw new AppError('Usuario no encontrado', 404);
      return user;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al obtener el usuario por email', 500, error);
    }
  },

  async create(data) {
    try {
      await validateUniqueEmail(data.email);
      await validateUniqueDni(data.dni);

      if (data.password) {
        data.password = await hashPassword(data.password);
      }

      return await User.create(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al crear usuario', 400, error);
    }
  },

  async update(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new AppError('Usuario no encontrado', 404);

      if (data.email && data.email !== user.email) await validateUniqueEmail(data.email, id);
      if (data.dni && data.dni !== user.dni) await validateUniqueDni(data.dni, id);

      if (data.password) {
        data.password = await hashPassword(data.password);
      }

      return await user.update(data);

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al actualizar usuario', 400, error);
    }
  },

  async softDelete(id) {
    try {
      const user = await this.getById(id);

      await user.update({ isActive: false });
      return { message: 'Usuario desactivado correctamente', id };

    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al desactivar usuario', 500, error);
    }
  },

  async login(email, password) {
    try {
      const user = await this.getByEmail(email);

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new AppError('Contraseña incorrecta', 401);

      const token = generateToken(user);
      return { user: { id: user.id, name: user.name, surname: user.surname, email: user.email }, token };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al iniciar sesión', 500, error);
    }
  }
};

