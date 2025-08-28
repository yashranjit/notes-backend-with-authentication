const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = {
  NoteModel,
};
