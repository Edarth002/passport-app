import express from "express";

const router = express.Router();

//login users
router.get("/login", (req, res) => {
  res.render("login", { message: null });
});

//Register users
router.get("/register", (req, res) => {
  res.render("register", { message: null });
});

export default router;
