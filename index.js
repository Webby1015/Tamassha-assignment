import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHander.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Manager is Active",
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
