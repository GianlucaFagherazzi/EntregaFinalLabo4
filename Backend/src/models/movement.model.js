export default (sequelize, DataTypes) => {
  const Movement = sequelize.define('Movement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    type: { type: DataTypes.ENUM('PURCHASE', 'SELL', 'ADJUST'), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DOUBLE, allowNull: false },

    performedByName: { type: DataTypes.STRING, allowNull: false },
    performedByDni: { type: DataTypes.STRING, allowNull: false },

    performedWithTarjetNumber: { type: DataTypes.STRING, allowNull: true },

    productId: { type: DataTypes.INTEGER, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    tarjetId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'movements',
    timestamps: false
  });

  return Movement;
};
