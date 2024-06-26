import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./auth/index";
import actionRouter from "./action/index";
import dbRouter from "./database/index";
import oAuthRouter from "./o/index";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "script")));
app.use(express.json());
app.use(cors());
// Setting the root path for views directory
app.set("views", path.join(__dirname, "views"));

// Setting the view engine
app.set("view engine", "ejs");

app.get("/", (_, res) => res.redirect("/auth/register"));

app.use(authRouter);
app.use(actionRouter);
app.use(dbRouter);
app.use(oAuthRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
