export default (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      storeId: { type: DataTypes.INTEGER, allowNull: false },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 },
      },
    },
    { tableName: "ratings", timestamps: false }
  );
  return Rating;
};