import express from "express";
import userCreate from "./usercreate";
import userFind from "./userfindtoken";
import userlogin from "./userlogin";
import userprojects from "./userprojects";

const router = express.Router();

router.get("/a/userfind", userFind);
router.post("/a/usercreate", userCreate);
router.post("/a/userlogin", userlogin);
router.get("/a/userprojects", userprojects);

export default router;
