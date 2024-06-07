import express from "express";
import userCreate from "./usercreate";
import login from "./login";

const router = express.Router();

router.post("/db/usercreate", userCreate);
router.post("/db/login", login);

export default router;
