import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHander.js";
import taskRoutes from "./routes/taskRoutes.js"

connectDb()
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(errorHandler);
app.use("/api/tasks",taskRoutes)

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Manager is Active",
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
