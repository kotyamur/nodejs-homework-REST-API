const { Contact } = require("../../models/contacts");

const getListContactsController = async (req, res, next) => {
  try {
    const { limit = 5, page = 1, favorite } = req.query;
    const skip = (page - 1) * limit;
    const { _id } = req.user;
    if (!favorite) {
      const contacts = await Contact.find({ owner: _id })
        .skip(skip)
        .limit(limit);
      return res.status(200).json(contacts);
    }
    const contacts = await Contact.find({ owner: _id, favorite })
      .skip(skip)
      .limit(limit);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContactsController,
};
