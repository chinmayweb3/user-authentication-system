import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./auth/index";
import dbRouter from "./db/index";
import actionRouter from "./action/index";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
// Setting the root path for views directory
app.set("views", path.join(__dirname, "views"));

// Setting the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  console.log("starting");
  // res.json({ message: "This is a starting message" });
  res.render("login");
});

app.use(authRouter);
app.use(dbRouter);
app.use(actionRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
