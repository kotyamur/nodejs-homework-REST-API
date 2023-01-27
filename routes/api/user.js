const express = require("express");
const {
  signup,
  login,
  current,
  logout,
  updateSubscription,
  updateUserAvatar,
} = require("../../controllers");
const {
  validateRequestBody,
  auth,
  checkChangeSubscriptionRequest,
  upload,
} = require("../../middlewares");
const { userValidateSchema } = require("../../schemas/userSchema");

const userRouter = express.Router();

userRouter.post("/signup", validateRequestBody(userValidateSchema), signup);
userRouter.post("/login", validateRequestBody(userValidateSchema), login);
userRouter.get("/logout", auth, logout);
userRouter.get("/current", auth, current);
userRouter.patch("/", auth, checkChangeSubscriptionRequest, updateSubscription);
userRouter.patch("/avatars", auth, upload.single("avatar"), updateUserAvatar);

module.exports = {
  userRouter,
};