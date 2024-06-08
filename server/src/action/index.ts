import express from "express";
import userCreate from "./usercreate";
import userFind from "./userfindtoken";

const router = express.Router();

router.post("/a/usercreate", userCreate);
router.get("/a/userfind", userFind);

export default router;
