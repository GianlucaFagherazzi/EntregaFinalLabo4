export default (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cbu: { type: DataTypes.STRING, allowNull: false },
    
    userId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'accounts',
    timestamps: false
  });

  return Account;
};

