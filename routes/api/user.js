const express = require("express");
const {
  signup,
  login,
  logout,
  current,
} = require("../../controllers/userControllers");
const { validateRequestBody, auth } = require("../../middlewares");
const { userValidateSchema } = require("../../schemas/userSchema");

const userRouter = express.Router();

userRouter.post("/signup", validateRequestBody(userValidateSchema), signup);
userRouter.post("/login", validateRequestBody(userValidateSchema), login);
userRouter.get("/logout", auth, logout);
userRouter.get("/current", auth, current);

module.exports = {
  userRouter,
};
