const express = require("express");
const noteRouter = express.Router();
const { auth } = require("../authentication/authMiddleware");
const { NoteModel } = require("../models/note");

noteRouter.get("/read", auth, async (req, res) => {
  try {
    const notes = await NoteModel.find(
      { user: req.userId },
      { title: 1, content: 1, createdAt: 1, _id: 1 }
    )
      .sort({ createdAt: -1 })
      .lean();
    res.json(notes);
  } catch (err) {
    res.json("Error reading notes.");
  }
});

noteRouter.post("/create", auth, async (req, res) => {
  const userId = req.userId;
  const title = req.body.title;
  const content = req.body.content;

  try {
    await NoteModel.create({
      user: userId,
      title: title,
      content: content,
    });
    res.json({
      message: "Note is created.",
    });
  } catch (err) {
    res.json({
      message: "Error creating note.",
    });
  }
});

noteRouter.put("/update/:id", auth, async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    const updatedNote = await NoteModel.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    if (!updatedNote) {
      return res.json({ message: "Note not found or not yours" });
    }
    res.json({ message: "Note updated", note: updatedNote });
  } catch (err) {
    res.json({ message: "Error updating note" });
  }
});

noteRouter.delete("/delete/:id", auth, async (req, res) => {
  try {
    const id = req.params.id || req.query.id;
    const deletedNote = await NoteModel.findOneAndDelete({
      _id: id,
      user: req.userId, // secure ownership
    });

    if (!deletedNote) {
      return res.json({ message: "Note not found or not yours" });
    }
    res.json({ message: "Deleted note successfully" });
  } catch (err) {
    res.json({ message: "Server error" });
  }
});
module.exports = {
  noteRouter,
};
