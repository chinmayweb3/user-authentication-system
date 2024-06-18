import express from "express";

const router = express.Router();

router.get("/o/auth/login", (req, res) => {
  //query need to bee clientid, redirect
  const query = req.query;

  // check if client id exists clientid

  // check if clientid has the same websitename as the

  console.log("this is query :", req.query);

  res.render("o/login");
});
router.get("/o/auth/consent", (req, res) => {
  res.render("register");
});

export default router;
