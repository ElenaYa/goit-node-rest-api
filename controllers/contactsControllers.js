import {Contact} from "../models/contacts.js";

import { createContactsSchema, updateContactsSchema } from "../schemas/contactsSchemas.js";

export async function getAllContacts (req, res, next) {
    try {
        const allContacts = await Contact.find();
        res.status(200).json(allContacts);
    } catch (error) {
        next(error);
    }
}
export async function getOneContact(req, res, next) {
        const {id} = req.params;
        try{
            const oneContact = await Contact.findById(id);
            if(!oneContact) {
                res.status(404).json({message: "Not found"});  
            } 
                res.status(200).json(oneContact);
            } catch(error) {
                next(error);
        }     
}
export async function deleteContact(req, res, next) {
    const {id} = req.params;
    try {
        const deletedContact = await Contact.findByIdAndDelete(id);
        if(deletedContact) {
            res.status(200).json(deletedContact);
        } else {
            res.status(404).json({message: "Not found"});
        }
    } catch(error) {
        next(error);
    }   
}
export async function createContact (req, res, next) {
    const {name, email, phone} = req.body;

    const {error} = createContactsSchema.validate({name, email, phone});
    if(error) {
        return res.status(400).json({message: "Fields must be filled"});
    }

    try {
        const newContact = await Contact.create({name, email, phone});
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
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});

        if(!result) {
            return res.status(404).json({message: "Not found"});
        }
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
}
export async function updateStatusContact(req, res, next) {
    const {id} = req.params;

    try {
        const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
        if(!result) {
            return res.status(404).json({message: "Not found"});
        }
        res.status(200).json(result);
    } catch(error) {
        next(error);
    }
}