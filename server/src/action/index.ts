import express from "express";
import userCreate from "./usercreate";
import userFind from "./userfindtoken";
import userlogin from "./userlogin";

const router = express.Router();

router.get("/a/userfind", userFind);
router.post("/a/usercreate", userCreate);
router.post("/a/userlogin", userlogin);

export default router;
