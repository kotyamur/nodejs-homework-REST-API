const { httpError } = require("../helpers");

const checkChangeFavoriteRequest = (req, res, next) => {
  const { favorite } = req.body;
  if (!favorite) {
    return next(httpError(400, "missing field favorite"));
  }

  return next();
};

module.exports = {
  checkChangeFavoriteRequest,
};
