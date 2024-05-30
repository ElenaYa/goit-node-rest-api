import express from "express";
import {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact,
    updateStatusContact
} from "../controllers/contactsControllers.js";
import { updateContactsSchema, createContactsSchema } from "../schemas/contactsSchemas.js";
import validateBody  from "../helpers/validateBody.js";
import middlewareAuth from "../helpers/middlewareAuth.js";

const contactsRouter = express.Router();

contactsRouter.get("/",middlewareAuth, getAllContacts);

contactsRouter.get("/:id",middlewareAuth, getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/",validateBody(createContactsSchema), middlewareAuth, createContact);

contactsRouter.put("/:id",validateBody(createContactsSchema), middlewareAuth, updateContact);

contactsRouter.patch("/:id/favorite",validateBody(updateContactsSchema), updateStatusContact);

export default contactsRouter;