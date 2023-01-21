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

const checkBodyRequest = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return next(httpError(400, "missing fields"));
  }

  return next();
};

const checkChangeFavoriteRequest = (req, res, next) => {
  const { favorite } = req.body;
  if (!favorite) {
    return next(httpError(400, "missing field favorite"));
  }

  return next();
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
    return next(error);
  }

  return next();
};

module.exports = {
  validateRequestBody,
  checkBodyRequest,
  checkChangeFavoriteRequest,
  auth,
};
