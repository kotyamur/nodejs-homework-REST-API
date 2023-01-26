const { httpError } = require("../helpers");

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

module.exports = {
  checkChangeSubscriptionRequest,
};
