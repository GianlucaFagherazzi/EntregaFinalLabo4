export default (sequelize, DataTypes) => {
  const MovementUser = sequelize.define('MovementUser', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    movementId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    accountId: { type: DataTypes.INTEGER, allowNull: false },
    tarjetId: { type: DataTypes.INTEGER, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false }
    
  }, {
    tableName: 'movementUsers',
    timestamps: false
  });

  return MovementUser;
};