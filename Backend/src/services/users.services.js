import { User } from '../models/index.models.js'
import { AppError } from '../utils/app.error.js'

export const UserService = {

  async getAll() {
    try {
      return await User.findAll({
        include: ['Products', 'Accounts', 'Movements']
      })

    } catch (error) {
      if (error instanceof AppError) throw error
      throw new AppError('Error al obtener los usuarios', 500, error)
    }
  },


  async getById(id) {
    try {
      const user = await User.findByPk(id, {
        include: ['Products', 'Accounts', 'Movements']
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
  }
}
