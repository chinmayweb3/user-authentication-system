import express from "express";
import userCreate from "./usercreate";

const router = express.Router();

router.post("/db/usercreate", userCreate);

export default router;
