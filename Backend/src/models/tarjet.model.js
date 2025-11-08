export default (sequelize, DataTypes) => {
  const Tarjet = sequelize.define('Tarjet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.INTEGER, allowNull: false },
    balance: { type: DataTypes.DOUBLE, allowNull: false }
  }, {
    tableName: 'tarjets',
    timestamps: false
  })

  return Tarjet;
};
