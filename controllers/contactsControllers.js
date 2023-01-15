const { httpError } = require("../helpers");
const { Contact } = require("../models/contacts");

const getListContactsController = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.status(200).json(contacts);
};

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

const createNewContactController = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return next(httpError(400, "missing required name field"));
    }
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);
    if (!contactById) {
      return next(httpError(404, "Not found"));
    }
    await Contact.findByIdAndRemove(contactId);
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      console.log(!name || !email || !phone);
      return next(httpError(400, "missing fields"));
    }
    const { contactId } = req.params;
    const contactById = await Contact.findById(contactId);
    if (!contactById) {
      return next(httpError(404, "Not found"));
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        name,
        email,
        phone,
      },
      { new: true }
    );
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContactsController,
  getContactByIdController,
  deleteContactController,
  createNewContactController,
  updateContactController,
};
