import express from "express";
import userCreate from "./usercreate";
import userFind from "./userfindtoken";
import userlogin from "./userlogin";
import projectadd from "./projectadd";
import showprojects from "./showprojects";

const router = express.Router();

router.get("/a/userfind", userFind);
router.post("/a/usercreate", userCreate);
router.post("/a/userlogin", userlogin);
router.post("/a/projectadd", projectadd);
router.get("/a/showprojects", showprojects);

export default router;
