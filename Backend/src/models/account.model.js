export default (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
  }, {
    tableName: 'accounts',
    timestamps: false
  });

  return Account;
};
