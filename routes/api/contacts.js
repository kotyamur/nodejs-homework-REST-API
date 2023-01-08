const express = require("express");
const { httpError } = require("../../helpers");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (contactById.length === 0) {
    return next(httpError(404, "Not found"));
  }
  return res.status(200).json(contactById);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return next(httpError(400, "missing required name field"));
  }
  const newContact = await addContact({ name, email, phone });
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (contactById.length === 0) {
    return next(httpError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  console.log(req.body);
  if (!name || !email || !phone) {
    console.log(!name || !email || !phone);
    return next(httpError(400, "missing fields"));
  }
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (contactById.length === 0) {
    return next(httpError(404, "Not found"));
  }
  const updatedContact = await updateContact(contactId, {
    name,
    email,
    phone,
  });
  return res.status(200).json(updatedContact);
});

module.exports = router;
