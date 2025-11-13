export default (sequelize, DataTypes) => {
  const Movement = sequelize.define('Movement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    type: {
      type: DataTypes.ENUM("PURCHASE", "ADJUST"),
      allowNull: false
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    tarjetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    tableName: 'movements',
    timestamps: false
  })

  return Movement
}
