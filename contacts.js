const fs = require("fs/promises");
const path = require('path');

const contactsPath = path.join(__dirname, "./db/contacts.json");

const shortid = require('shortid');

async function listContacts() {
    const dbRaw = await fs.readFile(contactsPath);
    const parsedDb = JSON.parse(dbRaw);
    return parsedDb;
}

async function getContactById(contactId) {
    const db = await listContacts();
    const contactToGet = db.find(contact => contact.id === contactId)
    return contactToGet;
}

async function removeContact(contactId) {
    const db = await listContacts();
    const updatedContactsList = db.filter(contact => contact.id !== contactId);

    return await fs.writeFile(contactsPath, JSON.stringify(updatedContactsList, null, 2));
}

async function addContact(name, email, phone) {
    const id = shortid.generate();
    const contact = { id, name, email, phone };
    
    const db = await listContacts()

    db.push(contact);
    return await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}