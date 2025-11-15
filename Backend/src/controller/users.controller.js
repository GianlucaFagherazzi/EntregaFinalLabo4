import { UserService } from '../services/users.services.js'

export const UserController = {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAll()
      res.json({ success: true, data: users })
    } catch (error) {
      next(error)
    }
  },

  async getUserById(req, res, next) {
    try {
      const user = await UserService.getById(Number(req.params.id))
      res.json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  },

  async createUser(req, res, next) {
    try {
      const newUser = await UserService.create(req.body)
      res.status(201).json({ success: true, data: newUser })
    } catch (error) {
      next(error)
    }
  },

  async deleteUser(req, res, next) {
    try {
      await UserService.delete(Number(req.params.id))
      res.status(200).json({ success: true, message: 'Usuario borrado con éxito' })
    } catch (error) {
      next(error)
    }
  },

  async loginUser(req, res, next) {
    try {
      const result = await UserService.login(req.body)
      res.status(201).json({ success: true, data: result })
    } catch (error) {
      next(error)
    }
  },

  async updateUser(req, res, next) {
      try {
        const updatedUser = await UserService.update(Number(req.params.id), req.body)
        res.json({ success: true, data: updatedUser })
      } catch (error) {
        next(error)
      }

    }

  }
