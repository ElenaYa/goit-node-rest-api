import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
        const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
}
  
async function getContactById(contactId) {
 
      const contacts = await listContacts();
      const result = contacts.find(item => item.id === contactId);
      return result || null;
}
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  
async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
  async function rewriteContact(id, data) {
    const dataContacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
    const allContacts = JSON.parse(dataContacts);
    const findContact = allContacts.findIndex((item) => item.id === id);
        if (findContact === -1) {
            return null;
  }

  allContacts[findContact] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[findContact];
  }

export {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    rewriteContact,
};