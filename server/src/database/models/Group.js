const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    orar: {
      type: Schema.Types.ObjectId,
      ref: "orar",
      default: "",
    },
    searchfield: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("group", GroupSchema);
