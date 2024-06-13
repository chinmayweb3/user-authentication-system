import express from "express";
import { prismadb } from "../utils/prisma";
import ejs from "ejs";

const router = express.Router();

router.get("/auth/register", (req, res) => {
  res.render("register");
});
router.get("/auth/dashboard", async (req, res) => {
  const fun = async (u: string, p: string) => {
    console.log("loding");
    const us = await prismadb.user.findFirst({
      where: { username: u },
    });
    console.log("users ", us);

    return us;
  };

  res.render("dashboard", {
    // async: true,
    checkUserProject: fun,
  });
});

router.get("/auth/consent", (req, res) => {
  //todo
  res.render("consent");
});

router.get("/auth/login", (req, res) => {
  //todo
  res.render("login");
});

router.get("/auth/profile", (req, res) => {
  //todo
  res.render("profile");
});

router.get("/auth/token", (req, res) => {
  //todo
  res.render("login");
});

export default router;
