const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  location: { type: String, required: true },
  locationType: {
    type: String,
    enum: ["Online", "Onsite"],
    default: "Onsite",
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  invitedPeople: [
    {
      participant: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      confirmed: {
        type: String,
        enum: ["Pending", "Yes", "No"],
        default: "Pending",
        required: true,
      },
    },
  ],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
});

module.exports = mongoose.model("appointment", AppointmentSchema);
