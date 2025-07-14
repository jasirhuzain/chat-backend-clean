import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addContact,
  removeContact,
  getContacts,
} from "../controllers/contact.controller.js";

const router = express.Router();

// Add a user to contacts
router.post("/add/:id", protectRoute, addContact);

// Remove a user from contacts
router.delete("/remove/:id", protectRoute, removeContact);

// Get current user's contact list
router.get("/", protectRoute, getContacts);

export default router;
