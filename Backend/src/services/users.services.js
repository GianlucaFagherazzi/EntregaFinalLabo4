
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
    { expiresIn: '1d' }
  );
}

export const UserService = {
  // Obtener todos los usuarios
  async getAll() {
    try {
      return await User.findAll({
        include: [
          { model: Product, as: 'Products' },
          { model: Account, as: 'Accounts' }
        ]
      });
    } catch (error) {
      throw new AppError('Error al obtener usuarios', 500, error);
    }
  },

  // Obtener por ID
  async getById(id) {
    try {
      const user = await User.findByPk(id, {
        include: [
          { model: Product, as: 'Products' },
          { model: Account, as: 'Accounts' }
        ]
      });
      if (!user) throw new AppError('Usuario no encontrado', 404);
      return user;
    } catch (error) {
      throw new AppError('Error al obtener el usuario', 500, error);
    }
  },

  // Crear usuario
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

  // Actualizar usuario
  async update(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new AppError('Usuario no encontrado', 404);

      if (data.email && data.email !== user.email) await validateUniqueEmail(data.email, id);
      if (data.dni && data.dni !== user.dni) await validateUniqueDni(data.dni, id);

      if (data.password) {
        data.password = await hashPassword(data.password);
      }

      const updated = await user.update(data);
      return updated;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al actualizar usuario', 400, error);
    }
  },

  // Soft delete
  async softDelete(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new AppError('Usuario no encontrado', 404);

      await user.update({ isActive: false });
      return { message: 'Usuario desactivado correctamente', id };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Error al desactivar usuario', 500, error);
    }
  },

  // Login
  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !user.isActive) throw new AppError('Usuario no encontrado o inactivo', 404);

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

