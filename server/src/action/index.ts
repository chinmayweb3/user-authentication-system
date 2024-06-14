import express from "express";
import userCreate from "./usercreate";
import userFind from "./userfindtoken";
import userlogin from "./userlogin";
import projectadd from "./projectadd";

const router = express.Router();

router.get("/a/userfind", userFind);
router.post("/a/usercreate", userCreate);
router.post("/a/userlogin", userlogin);
router.post("/a/projectadd", projectadd);

export default router;
