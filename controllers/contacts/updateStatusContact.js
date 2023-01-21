const { httpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const updateStatusContactController = async (req, res, next) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);
    if (!contactById) {
      return next(httpError(404, "Not found"));
    }

    const updatedStatusContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    return res.status(200).json(updatedStatusContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateStatusContactController,
};
