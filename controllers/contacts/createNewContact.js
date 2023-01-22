const { httpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const createNewContactController = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return next(httpError(400, "missing required name field"));
    }
    const { _id } = req.user;
    const newContact = await Contact.create({ name, email, phone, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewContactController,
};
