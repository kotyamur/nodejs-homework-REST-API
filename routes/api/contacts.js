const express = require("express");
const {
  getListContactsController,
  getContactByIdController,
  deleteContactController,
  createNewContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/contactsControllers");
const { validateRequestBody } = require("../../middlewares");
const {
  createAndUpdateContactSchema,
  updateStatusContactSchema,
} = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", getListContactsController);

router.get("/:contactId", getContactByIdController);

router.post(
  "/",
  validateRequestBody(createAndUpdateContactSchema),
  createNewContactController
);

router.delete("/:contactId", deleteContactController);

router.put(
  "/:contactId",
  validateRequestBody(createAndUpdateContactSchema),
  updateContactController
);
router.patch(
  "/:contactId/favorite",
  validateRequestBody(updateStatusContactSchema),
  updateStatusContactController
);

module.exports = router;
