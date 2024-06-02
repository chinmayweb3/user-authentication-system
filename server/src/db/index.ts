import express from "express";

const router = express.Router();

router.use(express.json());

router.post("/register", (req, res) => {
  console.log("reqest: ", req.body);
  res.json({ received: req.body });
});

export default router;
