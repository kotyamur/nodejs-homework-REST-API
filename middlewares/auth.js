const { httpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const { JWT_SECRET } = process.env;
httpError
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return next(httpError(401, "Not authorized"));
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      return next(httpError(401, "Not authorized"));
    }

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.message.includes("Unexpected token")
    ) {
      return next(httpError(401, "Not authorized"));
    }
    return next(error);
  }

  return next();
};

module.exports = {
  auth,
};
