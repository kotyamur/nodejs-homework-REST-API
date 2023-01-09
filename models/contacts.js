const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
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
    return contactById || null;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const parsedContacts = await readContactsFile();
    const filteredContact = parsedContacts.filter(
      (contact) => contact.id !== String(contactId)
    );
    await fs.writeFile(contactPath, JSON.stringify(filteredContact, null, 2));
    return;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const parsedContacts = await readContactsFile();
    const id = nanoid();
    const { name, email, phone } = body;
    const newContact = { id, name, email, phone };
    parsedContacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(parsedContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const parsedContacts = await readContactsFile();
    const { name, email, phone } = body;
    const updatedContacts = parsedContacts.map((contact) => {
      if (contact.id === String(contactId)) {
        contact.name = name;
        contact.email = email;
        contact.phone = phone;
      }
      return contact;
    });
    await fs.writeFile(contactPath, JSON.stringify(updatedContacts, null, 2));
    return await getContactById(contactId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
