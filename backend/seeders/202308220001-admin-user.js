import bcrypt from "bcryptjs";
export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("users", [
    {
      name: "System Administrator Default User",
      email: "admin@admin.com",
      address: "Admin HQ, 123 Main Street, City, Country",
      password: await bcrypt.hash("Admin@1234", 10),
      role: "admin"
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("users", { email: "admin@admin.com" });
}