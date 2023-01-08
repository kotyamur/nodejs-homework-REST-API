const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");
const contactPath = path.resolve(__dirname, "contacts.json");
console.log(__dirname);

const readContactsFile = async () => {
  try {
    const contacts = await fs.readFile(contactPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const listContacts = async () => {
  try {
    const parsedContacts = await readContactsFile();
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const parsedContacts = await readContactsFile();
    const contactById = parsedContacts.filter((contact) => {
      return contact.id === String(contactId);
    });
    return contactById;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
