import express from "express";

const router = express.Router();

router.get("/auth/register", (req, res) => {
  res.render("register");
});
// router.get("/auth/generatetoken", generateToken);

router.get("/auth/consent", (req, res) => {
  //todo
  res.render("consent");
});

router.get("/auth/login", (req, res) => {
  //todo
  res.render("login");
});

router.get("/auth/token", (req, res) => {
  //todo
  res.render("login");
});

export default router;
