const { signup } = require("./signup");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { updateSubscription } = require("./updateSubscription");
const { updateUserAvatar } = require("./updateUserAvatar");

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  updateUserAvatar,
};