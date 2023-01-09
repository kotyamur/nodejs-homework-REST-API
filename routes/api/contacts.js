const express = require("express");
const {
  getListContactsController,
  getContactByIdController,
  deleteContactController,
  createNewContactController,
  updateContactController,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", getListContactsController);

router.get("/:contactId", getContactByIdController);

router.post("/", createNewContactController);

router.delete("/:contactId", deleteContactController);

router.put("/:contactId", updateContactController);

module.exports = router;
