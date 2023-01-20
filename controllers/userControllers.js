const { User } = require("../models/users");
const { httpError } = require("../helpers");

const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  const { email, password, subscription = "starter" } = req.body;
  console.log(req.body);
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      email,
      password: hashedPassword,
      subscription,
    });

    res.status(201).json({
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(httpError(409, "Email in use"));
    }
    next(error);
  }
};

module.exports = {
  signup,
};
