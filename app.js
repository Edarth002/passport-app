import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import home from "./routes/index.js";
import users from "./routes/users.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { keys } from "./config/keys.js";
import passport from "passport";
import authPassport from "./config/passport.js";
import session from "express-session";

const app = express();
const PORT = process.env.PORT || 5000;

//Config
const db = keys.MongoURI;
authPassport(passport);
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Connection to MongoDb
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("Detailed error message: ", err.message));

//EJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Parsing Requests
app.use(express.urlencoded({ extended: false }));

app.use(expressEjsLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Routes

app.use("/", home);

app.use("/users", users);

//Listening...
app.listen(PORT, () => {
  console.log(`App is running on PORT: ${PORT}`);
});
