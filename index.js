import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dataBaseConnection } from "./db.js";
import { userRouter } from "./routes/user.js";
import { isAuthenticated } from "./controllers/auth.js";
import { detailRouter } from "./routes/detail.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8050;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Working Good...");
});

dataBaseConnection();

app.use("/user", userRouter);
app.use("/user", isAuthenticated, detailRouter);

app.listen(PORT, () => console.log(`Server running at localhost : ${PORT}`));
