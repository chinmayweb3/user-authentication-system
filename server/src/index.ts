dotenv.config();
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./auth/index";
import actionRouter from "./action/index";

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
// Setting the root path for views directory
app.set("views", path.join(__dirname, "views"));

// Setting the view engine
app.set("view engine", "ejs");

app.get("/", (_, res) => res.redirect("/auth/register"));

app.use(authRouter);
app.use(actionRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
