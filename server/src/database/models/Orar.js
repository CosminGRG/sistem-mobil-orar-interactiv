const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrarItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String },
  professor: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  location: { type: String, required: true },
  locationtype: {
    type: String,
    enum: ["Online", "Onsite"],
    default: "Onsite",
    required: true,
  },
  linkmeet: { type: String, required: false },
  repeats: {
    type: String,
    enum: ["weekly", "odd", "even"],
    default: "weekly",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const ZiSchema = new Schema({
  name: { type: String, required: true },
  orarItems: [OrarItemSchema],
});

const OrarSchema = new Schema(
  {
    tag: { type: String, required: true },
    shorttag: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    zile: [ZiSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orar", OrarSchema);
