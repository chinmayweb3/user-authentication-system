import express from "express";
import userCreate from "./usercreate";

const router = express.Router();

router.post("/a/usercreate", userCreate);

export default router;
