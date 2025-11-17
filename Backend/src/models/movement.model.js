export default (sequelize, DataTypes) => {
  const Movement = sequelize.define('Movement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.DOUBLE, allowNull: false },
    totalAmount: { type: DataTypes.DOUBLE, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }

  }, {
    tableName: 'movements',
    timestamps: false
  });

  return Movement;
};
