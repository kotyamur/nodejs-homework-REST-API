const { httpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);
    if (!contactById) {
      return next(httpError(404, "Not found"));
    }
    return res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactByIdController,
};
