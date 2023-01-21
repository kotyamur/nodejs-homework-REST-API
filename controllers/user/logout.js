const { User } = require("../../models/users");
const { httpError } = require("../../helpers");

const logout = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return next(httpError(401, "Not authorized"));
    }
    const logoutUser = await User.findByIdAndUpdate(id, { token: null });
    console.log(logoutUser);
    return res.status(204).json(logoutUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  logout,
};
