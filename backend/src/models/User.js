export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          len: [20, 60],
        },
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
      password: { type: DataTypes.STRING, allowNull: false },
      role: {
        type: DataTypes.ENUM("admin", "user", "owner"),
        defaultValue: "user",
      },
    },
    { tableName: "users", timestamps: false }
  );
  return User;
};