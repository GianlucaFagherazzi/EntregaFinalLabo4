export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    description: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DOUBLE, allowNull: false },
    stock: { type: DataTypes.DOUBLE, allowNull: false , defaultValue: 0 },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

    userId: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'products',
    timestamps: false
  });

  return Product;
};