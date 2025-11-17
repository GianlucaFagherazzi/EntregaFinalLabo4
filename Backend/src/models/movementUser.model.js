export default (sequelize, DataTypes) => {
  const MovementUser = sequelize.define('MovementUser', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    idMovement: { type: DataTypes.INTEGER, allowNull: false },
    idUser: { type: DataTypes.INTEGER, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'movementUsers',
    timestamps: false
  });

  return MovementUser;
};