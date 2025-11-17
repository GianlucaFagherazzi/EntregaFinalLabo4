export default (sequelize, DataTypes) => {
  const Movement = sequelize.define('Movement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idProduct: { type: DataTypes.INTEGER, allowNull: true },
    quantity: { type: DataTypes.DOUBLE, allowNull: false },
    totalAmount: { type: DataTypes.DOUBLE, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }

  }, {
    tableName: 'movements',
    timestamps: false
  });

  return Movement;
};
