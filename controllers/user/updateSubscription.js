const { User } = require("../../models/users");
const { httpError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;

    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return next(httpError(401, "Not authorized"));
    }
    const updateUser = await User.findByIdAndUpdate(
      id,
      { subscription },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateSubscription,
};
