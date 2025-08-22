{
  "up": async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ratings", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      storeId: { type: Sequelize.INTEGER, allowNull: false },
      value: { type: Sequelize.INTEGER, allowNull: false }
    });
  },
  "down": async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ratings");
  }
}