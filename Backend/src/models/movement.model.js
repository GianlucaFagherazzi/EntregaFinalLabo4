export default (sequelize, DataTypes) => {
  const Movement = sequelize.define('Movement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.ENUM('compra', 'venta', 'ajuste'), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { 
    tableName: 'movements', 
    timestamps: false 
  })
  return Movement;
};