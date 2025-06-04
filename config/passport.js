import { Strategy as LocalStrategy } from "passport-local";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const authPassport = (passport) => {
  passport.use(
    new LocalStrategy(
      { userNameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });

          if (!user) {
            return done(null, false, { message: "Email is not registered" });
          }

          //Match Password
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            console.log("Login Successful");
            return done(null, user);
          }
          return done(null, false, { message: "Password Incorrect" });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Serialize and deserialize user (for session support)
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default authPassport;
