const { httpError } = require("../helpers");

const checkBodyRequest = (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return next(httpError(400, "missing fields"));
  }

  return next();
};


module.exports = {
  checkBodyRequest,
};
