const express = require("express");
const authRouter = express.Router();
const z = require("zod");
const { bodySchema } = require("../utils/validate");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

authRouter.post("/signup", async (req, res) => {
  
  const parsedData = bodySchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.json({
      message: "Incorrect format.",
    });
  }
  const { firstName, lastName, email, password } = parsedData.data;

  try {
    const hashedPassed = await bcrypt.hash(password, 10);
    await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassed,
    });
    res.json({ message: "You have signed up! Now proceed to sign in." });
  } catch (err) {
    if (err.code === 11000) {
      res.json({ message: "User already exists." });
      return;
    }
    console.log("Sign up error ", err);
    return res.json({ message: "Internal server error" });
  }
});

authRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const response = await UserModel.findOne({ email: email });

  if (!response) {
    return res.json({ message: "Invalid credentials." });
  }
  const passwordMatch = await bcrypt.compare(password, response.password);
  if (passwordMatch) {
    const token = jwt.sign({ id: response._id.toString() }, JWT_SECRET);
    return res.json({token});
  }else{
    return res.json({message: "Invalid credentials"});
  }
});

module.exports = {
  authRouter,
};
