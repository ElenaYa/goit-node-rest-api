import {
    addContact,
    getContactById,
    listContacts,
    removeContact,
    rewriteContact,
  } from "../services/contactsServices.js";
import { createContactsSchema, updateContactsSchema } from "../schemas/contactsSchemas.js";


export async function getAllContacts (req, res, next) {
    try {
        const allContacts = await listContacts();
        res.status(200).json(allContacts);
    } catch (error) {
        next(error);
    }
}

export async function getOneContact(req, res) {
        const {id} = req.params;
        const oneContact = await getContactById(id);
        if(oneContact) {
            res.status(200).json(oneContact);
        } else {
            res.status(404).json({message: "Not found"});
        }
}

export async function deleteContact(req, res) {
    const {id} = req.params;
    const deletedContact = await removeContact(id);
    if(deletedContact) {
        res.status(200).json(deletedContact);
    } else {
        res.status(404).json({message: "Not found"});
    }
}

export async function createContact (req, res, next) {
    const {name, email, phone} = req.body;

    const {error} = createContactsSchema.validate({name, email, phone});
    if(error) {
        return res.status(400).json({message: "Fields must be filled"});
    }

    try {
        const newContact = await addContact(name, email, phone);
        res.status(201).json(newContact);
    } catch (error) {
        next(error);
    }
}

export async function updateContact (req, res, next) {
    const {id} = req.params;
    const {name, email, phone} = req.body;
    const {error} = updateContactsSchema.validate({name, email, phone});

    if(Object.keys(req.body).length === 0) {
        return res.status(400).json({message: "Body must have at least one field"});
    }
    if(error) {
        return res.status(400).json({message: error.message});
    }
    try {
        const result = await rewriteContact(id, req.body);
        if(!result) {
            return res.status(404).json({message: "Not found"});
        }
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
}