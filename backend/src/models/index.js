import Sequelize from "sequelize";
import config from "../config.js";
import UserModel from "./User.js";
import StoreModel from "./Store.js";
import RatingModel from "./Rating.js";

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: false,
  }
);

const User = UserModel(sequelize, Sequelize.DataTypes);
const Store = StoreModel(sequelize, Sequelize.DataTypes);
const Rating = RatingModel(sequelize, Sequelize.DataTypes);

// Relationships
User.hasMany(Rating, { foreignKey: "userId" });
Rating.belongsTo(User, { foreignKey: "userId" });

Store.hasMany(Rating, { foreignKey: "storeId" });
Rating.belongsTo(Store, { foreignKey: "storeId" });

Store.belongsTo(User, { as: "owner", foreignKey: "ownerId" }); // Store Owner

export { sequelize, User, Store, Rating };