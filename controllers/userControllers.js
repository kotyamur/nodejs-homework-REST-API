const { User } = require("../models/users");
const { httpError } = require("../helpers");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      user: {
        email,
        subscription: savedUser.subscription,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      return next(httpError(409, "Email in use"));
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const storedUser = await User.findOne({
      email,
    });

    if (!storedUser) {
      return next(httpError(401, "Email or password is wrong"));
    }

    const isPasswordValid = await bcrypt.compare(password, storedUser.password);

    if (!isPasswordValid) {
      return next(httpError(401, "Email or password is wrong"));
    }

    const payload = { id: storedUser._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    await User.findByIdAndUpdate(storedUser._id, { token });

    return res.json({
      token,
      user: {
        email,
        subscription: storedUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return next(httpError(401, "Not authorized"));
    }
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
