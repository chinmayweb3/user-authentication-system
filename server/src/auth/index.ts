import express from "express";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/consent", (req, res) => {
  //todo
  res.render("consent");
});

router.get("/login", (req, res) => {
  //todo
  res.render("login");
});

router.get("/token", (req, res) => {
  //todo
  res.render("login");
});

export default router;
