export default (sequelize, DataTypes) => {
  const Store = sequelize.define(
    "Store",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: { len: [20, 60] },
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      address: {
        type: DataTypes.STRING(400),
        allowNull: false,
        validate: { len: [0, 400] },
      },
      ownerId: { type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: "stores", timestamps: false }
  );
  return Store;
};