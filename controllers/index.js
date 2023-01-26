const {
  getListContactsController,
  getContactByIdController,
  deleteContactController,
  createNewContactController,
  updateContactController,
  updateStatusContactController,
} = require("./contacts");
const {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  updateUserAvatar,
} = require("./user");

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscription,
  getListContactsController,
  getContactByIdController,
  deleteContactController,
  createNewContactController,
  updateContactController,
  updateStatusContactController,
  updateUserAvatar,
};