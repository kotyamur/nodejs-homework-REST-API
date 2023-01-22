const express = require("express");
const {
  getListContactsController,
  getContactByIdController,
  deleteContactController,
  createNewContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers");
const {
  validateRequestBody,
  checkBodyRequest,
  checkChangeFavoriteRequest,
  auth,
} = require("../../middlewares");
const {
  createAndUpdateContactSchema,
  updateStatusContactSchema,
} = require("../../schemas/contactsSchema");

const router = express.Router();

router.get("/", auth, getListContactsController);

router.get("/:contactId", auth, getContactByIdController);

router.post(
  "/",
  auth,
  validateRequestBody(createAndUpdateContactSchema),
  createNewContactController
);

router.delete("/:contactId", auth, deleteContactController);

router.put(
  "/:contactId",
  auth,
  checkBodyRequest,
  validateRequestBody(createAndUpdateContactSchema),
  updateContactController
);
router.patch(
  "/:contactId/favorite",
  auth,
  checkChangeFavoriteRequest,
  validateRequestBody(updateStatusContactSchema),
  updateStatusContactController
);

module.exports = router;
