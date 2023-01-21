const { User } = require("../../models/users");
const { httpError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { JWT_SECRET } = process.env;

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

module.exports = {
  login,
};
