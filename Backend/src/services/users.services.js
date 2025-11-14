import { User, Product, Account, Movement, Category } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const UserService = {

  async getAll() {
    try {
      return await User.findAll({
        include: [
          { model: Product, as: 'Products',
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
    try {
      const user = await User.findByPk(id, {
        include: [
          { model: Product, as: 'Products' },
          { model: Account, as: 'Accounts' },
          { model: Movement, as: 'Movements' }
        ]
      })

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
      const userByEmail = await User.findOne({ where: { email: data.email } })
      if (userByEmail) {
        throw new AppError('Ya existe un usuario con ese email', 409)
      }

      const userByDni = await User.findOne({ where: { dni: data.dni } })
      if (userByDni) {
        throw new AppError('Ya existe un usuario con ese DNI', 409)
      }

      // HASH de la contraseña
      const hashedPassword = await bcrypt.hash(data.password, 10)
      data.password = hashedPassword

      return await User.create(data)

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al crear el usuario. Verifica los datos enviados.', 400, error)
    }
  },


  async update(id, data) {
    try {
      const user = await User.findByPk(id)
      if (!user) {
        throw new AppError('Usuario no encontrado', 404)
      }

      if (data.email) {
        const emailInUse = await User.findOne({ where: { email: data.email } })
        if (emailInUse && emailInUse.id !== id) {
          throw new AppError('El email ya está en uso por otro usuario', 409)
        }
      }

      if (data.dni) {
        const dniInUse = await User.findOne({ where: { dni: data.dni } })
        if (dniInUse && dniInUse.id !== id) {
          throw new AppError('El dni ya está en uso por otro usuario', 409)
        }
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
