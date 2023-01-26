const { httpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const multer = require("multer");
const path = require("path");

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

const checkChangeSubscriptionRequest = (req, res, next) => {
  const { subscription } = req.body;

  if (
    !subscription ||
    (subscription !== "starter" &&
      subscription !== "pro" &&
      subscription !== "business")
  ) {
    return next(
      httpError(
        400,
        "Subscription must be one of the following values: 'starter', 'pro', 'business'!!!"
      )
    );
  }

  return next();
};

const uploadDir = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage: storage,
});

module.exports = {
  validateRequestBody,
  checkBodyRequest,
  checkChangeFavoriteRequest,
  auth,
  checkChangeSubscriptionRequest,
  upload,
};
