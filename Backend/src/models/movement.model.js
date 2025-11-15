export default (sequelize, DataTypes) => {
  const Movement = sequelize.define('Movement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    type: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DOUBLE, allowNull: false },

    productId: { type: DataTypes.INTEGER, allowNull: true },
    userBuyerId: { type: DataTypes.INTEGER, allowNull: true },
    userSellerId: { type: DataTypes.INTEGER, allowNull: true },
    tarjetId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'movements',
    timestamps: false
  });

  return Movement;
};
