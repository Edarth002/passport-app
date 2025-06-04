import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport";

const router = express.Router();

//login users
router.get("/login", (req, res) => {
  res.render("login");
});

//Login Route
router.post("/login", (req, res, next) => {
  console.log("Login form data:", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      console.log("Login failed:", info.message);
      return res.redirect("/users/login");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/users/dashboard");
    });
  })(req, res, next);
});

//Register users
router.get("/register", (req, res) => {
  res.render("register");
});

//Register Route
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
    return res.render("register", {
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
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("Successfully registered User: ", newUser);
    res.redirect("/users/login");
  } catch (err) {
    console.log("Registration error: ", err);
    res.status(500).send("Server error");
  }
});

//Dashboard Route
router.get("/dashboard", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/users/login");
  }
  res.render("dashboard", { username: req.user.username });
});

export default router;
