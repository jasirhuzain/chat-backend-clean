import User from "../models/user.model.js";

// Add a contact
export const addContact = async (req, res) => {
  try {
    const userId = req.user._id;
    const contactId = req.params.id;

    if (userId.toString() === contactId) {
      return res.status(400).json({ message: "You cannot add yourself." });
    }

    const user = await User.findById(userId);
    if (!user.contacts.includes(contactId)) {
      user.contacts.push(contactId);
      await user.save();
    }

    res.status(200).json({ message: "Contact added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error adding contact", error });
  }
};

// Remove a contact
export const removeContact = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.contacts = user.contacts.filter(
      (contactId) => contactId.toString() !== req.params.id
    );
    await user.save();

    res.status(200).json({ message: "Contact removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error removing contact", error });
  }
};

// Get current user's contacts
export const getContacts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("contacts", "_id fullName email profilePic");
    res.status(200).json(user.contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};
