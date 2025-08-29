const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String },
    content: { type: String },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = {
  NoteModel,
};
