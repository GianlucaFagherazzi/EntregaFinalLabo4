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
      const user = await UserService.getById(req.params.id)
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
      await UserService.delete(req.params.id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  },

  async loginUser(req, res, next) {
  try {
    const result = await UserService.login(req.body)
    console.log(result);
    res.status(201).json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
}

}
