export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    stock: { type: DataTypes.DECIMAL(10,2), allowNull: false }
  }, {
    tableName: 'products',
    timestamps: false
  });

  return Product;
};