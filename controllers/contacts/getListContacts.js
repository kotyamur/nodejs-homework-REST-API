const { Contact } = require("../../models/contacts");

const getListContactsController = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const contacts = await Contact.find({}).limit(limit);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContactsController,
};
