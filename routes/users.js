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

//Register Render
router.post("/users/register", (req, res) => {
  const { name, email, password } = req.body;

  const errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: "All fields are required here, fill them" });
  }

  if (password.length < 0) {
    errors.push({ msg: "Password must be atleast six characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      email,
      name,
      password,
    });
  } else {
    res.send("Successful registration");
  }
});

export default router;
