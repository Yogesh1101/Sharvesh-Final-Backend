import express from "express";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../controllers/user.js";
import { User, generateToken } from "../models/user.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let user = await getUserByEmail(req);
    if (user) {
      return res.json({ error: "User already exist..." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    }).save();
    const token = generateToken(user._id);
    res.json({ message: "User Created Successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internel Server Error..." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await getUserByEmail(req);
    if (!user) {
      return res.json({ error: "User Not Found..." });
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.json({ error: "Invalid Password..." });
    }
    const token = generateToken(user._id);
    res.json({ message: "Logged In Successfully...", token });
  } catch (error) {
    console.log(error);
    res.json({ error: "Internel Server Error..." });
  }
});

export const userRouter = router;
