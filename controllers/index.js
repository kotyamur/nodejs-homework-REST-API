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
};
