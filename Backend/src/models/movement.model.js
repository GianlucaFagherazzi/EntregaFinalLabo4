export default (sequelize, DataTypes) => {
  const Movement = sequelize.define('Movement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    type: { type: DataTypes.ENUM('PURCHASE', 'SELL', 'ADJUST'), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DOUBLE, allowNull: false },

    productId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    tarjetId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'movements',
    timestamps: false
  });

  return Movement;
};
