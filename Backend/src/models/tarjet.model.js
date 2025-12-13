export default (sequelize, DataTypes) => {
  const Tarjet = sequelize.define('Tarjet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.STRING(19), allowNull: false },
    balance: { type: DataTypes.DOUBLE, allowNull: false },
    accountId: { type: DataTypes.INTEGER, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'tarjets',
    timestamps: false
  })

  return Tarjet;
};
