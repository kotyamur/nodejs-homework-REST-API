const { httpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const { JWT_SECRET } = process.env;

const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(httpError(400, error.message));
    }

    return next();
  };
};

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return next(httpError(401, "Not authorized"));
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError" ||
      error.message.includes("Unexpected token")
    ) {
      return next(httpError(401, "Not authorized"));
    }
    next(error);
  }

  next();
};

module.exports = {
  validateRequestBody,
  auth,
};
