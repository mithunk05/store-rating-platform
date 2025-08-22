{
  "up": async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(60), allowNull: false },
      email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      address: { type: Sequelize.STRING(400), allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM("admin", "user", "owner"), allowNull: false, defaultValue: "user" }
    });
  },
  "down": async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  }
}