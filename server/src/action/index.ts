import express from "express";
import userCreate from "./usercreate";
import userFind from "./userfind";

const router = express.Router();

router.post("/a/usercreate", userCreate);
router.post("/a/userfind", userFind);

export default router;
