const express = require("express");
const { signup, login } = require("../../controllers/userControllers");
const { validateRequestBody } = require("../../middlewares");
const { userValidateSchema } = require("../../schemas/userSchema");

const userRouter = express.Router();

userRouter.post("/signup", validateRequestBody(userValidateSchema), signup);
userRouter.post("/login", validateRequestBody(userValidateSchema), login);

module.exports = {
  userRouter,
};
