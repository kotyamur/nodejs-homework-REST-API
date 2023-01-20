const express = require("express");
const { signup } = require("../../controllers/userControllers");
const { validateRequestBody } = require("../../middlewares");
const { userValidateSchema } = require("../../schemas/userSchema");

const userRouter = express.Router();

userRouter.post("/signup", validateRequestBody(userValidateSchema), signup);

module.exports = {
  userRouter,
};
