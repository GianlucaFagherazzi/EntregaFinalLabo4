import { UserService } from '../services/users.services.js';

export const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAll()
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await UserService.create(req.body)
      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        newUser
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear el usuario',
        error: error.errors[0].message
      })
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await UserService.findByPk(req.params.id)
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
      await user.destroy()
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}