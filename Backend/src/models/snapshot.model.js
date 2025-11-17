export default (sequelize, DataTypes) => {
  const Snapshot = sequelize.define('Snapshot', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    movementId: { type: DataTypes.INTEGER, allowNull: true },
    buyerName: { type: DataTypes.STRING, allowNull: false },
    sellerName: { type: DataTypes.STRING, allowNull: false },
    productName: { type: DataTypes.STRING, allowNull: false },
    numberTarjet: { type: DataTypes.STRING(4), allowNull: false },
    quantity: { type: DataTypes.DOUBLE, allowNull: false },
    amount: { type: DataTypes.DOUBLE, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW}

  }, {
    tableName: 'snapshots',
    timestamps: false
  });

  return Snapshot;
};