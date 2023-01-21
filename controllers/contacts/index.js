const { createNewContactController } = require("./createNewContact");
const { deleteContactController } = require("./deleteContact");
const { getContactByIdController } = require("./getContactById");
const { getListContactsController } = require("./getListContacts");
const { updateContactController } = require("./updateContact");
const { updateStatusContactController } = require("./updateStatusContact");

module.exports = {
  getListContactsController,
  getContactByIdController,
  deleteContactController,
  createNewContactController,
  updateContactController,
  updateStatusContactController,
};