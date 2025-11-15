import { User, Product, Account, Movement, Category } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize';


export const UserService = {
  async getAll() {
    try {
      // Traer todos los usuarios con sus productos, cuentas y movimientos
      return await User.findAll({
        include: [
          {
            model: Product, as: 'Products',
            include: [{ model: Category, as: 'Category' }]
          },
          { model: Account, as: 'Accounts' },
          { model: Movement, as: 'Movements' }
        ]
      })

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener los usuarios', 500, error)
    }
  },

  async getById(id) {
    // Traer un usuario por ID con sus productos, cuentas y movimientos
    try {
      const user = await User.findByPk(id, {
        include: [
          { model: Product, as: 'Products' },
          { model: Account, as: 'Accounts' },
          { model: Movement, as: 'Movements' }
        ]
      })

      // Si no se encontró el usuario, tira error
      if (!user) {
        throw new AppError('Usuario no encontrado', 404)
      }

      return user

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener el usuario', 500, error)
    }
  },

  async create(data) {
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ email: data.email }, { dni: data.dni }]
        }
      });

      if (existingUser) {
        if (existingUser.email === data.email)
          throw new AppError("Ya existe un usuario con ese email", 409);

        if (existingUser.dni === data.dni)
          throw new AppError("Ya existe un usuario con ese DNI", 409);
      }

      // HASH de la contraseña
      data.password = await bcrypt.hash(data.password, 10)

      return await User.create(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al crear el usuario. Verifica los datos enviados.', 400, error)
    }
  },

  async update(id, data) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new AppError("Usuario no encontrado", 404);
      }
      // Validar email o dni duplicados
      if (data.email || data.dni) {
        const existingUser = await User.findOne({
          where: {
            [Op.or]: [
              data.email ? { email: data.email } : {},
              data.dni ? { dni: data.dni } : {}
            ],
            id: { [Op.ne]: id } // evitar que choque con él mismo
          }
        });

        if (existingUser) {
          if (existingUser.email === data.email)
            throw new AppError("Ya existe un usuario con ese email", 409);

          if (existingUser.dni === data.dni)
            throw new AppError("Ya existe un usuario con ese DNI", 409);
        }
      }

      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      return await user.update(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al actualizar el usuario', 400, error)
    }
  },

  async delete(id) {
    try {
      const user = await User.findByPk(id)
      if (!user) {
        throw new AppError('Usuario no encontrado', 404)
      }

      await user.destroy()
      return true

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al eliminar el usuario', 500, error)
    }
  },

  async login(data) {
    try {
      // Buscar al usuario por email
      const user = await User.findOne({ where: { email: data.email } })
      if (!user) {
        throw new AppError('Usuario no encontrado', 404)
      }

      // Comparar contraseñas
      console.log(data.password, user.password);
      const isValid = await bcrypt.compare(data.password, user.password)
      if (!isValid) {
        throw new AppError('Contraseña incorrecta', 401)
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      )

      return { user, token }
    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al iniciar sesión', 500, error)
    }
  }
}
