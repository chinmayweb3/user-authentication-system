import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

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

app.get("/auth/login", (req, res) => {
  //todo
  res.render("login");
});

app.get("/auth/consent", (req, res) => {
  //todo
  res.render("consent");
});

app.get("/auth/token", (req, res) => {
  //todo
  res.render("login");
});

app.get("/db/usercheck", (req, res) => {
  //todo
  res.render("login");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
