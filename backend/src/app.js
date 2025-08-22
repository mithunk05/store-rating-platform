import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";
import userRoutes from "./routes/user.js";
import storeRoutes from "./routes/store.js";
import ratingRoutes from "./routes/rating.js";
import adminRoutes from "./routes/admin.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import config from "./config.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => res.send("Store Ratings Platform API"));

app.use(errorHandler); // Error handler last

const start = async () => {
  try {
    await sequelize.authenticate();
    app.listen(config.port, () =>
      console.log(`Server running on http://localhost:${config.port}`)
    );
  } catch (e) {
    console.error(e);
  }
};
start();