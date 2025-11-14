import { sequelize, User, Product, Tarjet } from '../models/index.models.js'

export const MovementService = {
  async create({ userId, productId, tarjetId, quantity }) {

    return await sequelize.transaction(async (t) => {

      const user = await User.findByPk(userId)
      if (!user) throw new AppError('Usuario no encontrado', 404)

      const product = await Product.findByPk(productId)
      if (!product) throw new AppError('Producto no encontrado', 404)

      if (product.stock < quantity) {
        throw new AppError('Stock insuficiente', 400)
      }

      const totalAmount = product.price * quantity

      const tarjet = await Tarjet.findByPk(tarjetId)
      if (!tarjet) throw new AppError('Tarjeta no encontrada', 404)

      if (tarjet.balance < totalAmount) {
        throw new AppError('Saldo insuficiente', 400)
      }

      // Actualizar stock
      await product.update(
        { stock: product.stock - quantity },
        { transaction: t }
      )

      // Actualizar saldo
      await tarjet.update(
        { balance: tarjet.balance - totalAmount },
        { transaction: t }
      )

      // Registrar movimiento
      const movement = await Movement.create({
        date: new Date(),
        type: 'PURCHASE',
        quantity,         
        amount: totalAmount,
        productId,
        userId,
        tarjetId
      }, { transaction: t })

      return movement
    })
  }
}
