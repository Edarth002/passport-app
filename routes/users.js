import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

//login users
router.get("/login", (req, res) => {
  res.render("login");
});

//Register users
router.get("/register", (req, res) => {
  res.render("register");
});

//Register Render
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  const errors = [];

  if (!username || !email || !password) {
    errors.push({ msg: "All fields are required here, fill them" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be atleast six characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      username,
      email,
      password,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      errors.push({ msg: "Email already registered" });
      return res.render("register", {
        errors,
        username,
        email,
        password,
      });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    console.log("Successfully registered User: ", newUser);
    res.redirect("/users/login");
  } catch (err) {
    console.log("Registration error: ", err);
    res.status(500).send("Server error");
  }
});

export default router;
