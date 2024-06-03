import express from "express";
import { prismadb } from "../utils/prisma";

const router = express.Router();

router.use(express.json());

router.post("/register", async (req, res) => {
  console.log("reqest: ", req.body);
  const resp = await prismadb.user.create({
    data: {
      email: "dsf",
      name: "sdf",
      password: "sdf",
    },
  });
  console.log("data saved :", resp);

  res.json({ received: resp });
});

export default router;
