import { UserService } from '../services/users.services.js'

export const UserController = {
  async getAll(req, res, next) {
    try {
      const users = await UserService.getAll()
      res.json({ success: true, data: users })
    } catch (error) {
      next(error)
    }
  },

  async getById(req, res, next) {
    try {
      const user = await UserService.getById(Number(req.params.id))
      res.json({ success: true, data: user })
    } catch (error) {
      next(error)
    }
  },

  async create(req, res, next) {
    try {
      const newUser = await UserService.create(req.body)
      res.status(201).json({ success: true, data: newUser })
    } catch (error) {
      next(error)
    }
  },

  async update(req, res, next) {
    try {
      const updatedUser = await UserService.update(Number(req.params.id), req.body)
      res.json({ success: true, data: updatedUser })
    } catch (error) {
      next(error)
    }
  },

  async softDelete(req, res, next) {
    try {
      const result = await UserService.softDelete(Number(req.params.id));
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;  
      const result = await UserService.login(email, password); 
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

}

