const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    uniyear: { type: String, required: false },
    salt: { type: String, required: true },
    professor: { type: Boolean, default: false, required: false },
    administrator: { type: Boolean, default: false, required: false },
    searchfield: { type: String, default: "", required: true },
    group: {
      type: Schema.Types.ObjectId,
      ref: "group",
      default: "",
      required: false,
    },
    orar: {
      type: Schema.Types.ObjectId,
      ref: "orar",
      default: "",
      required: false,
    },
    appointments: [
      {
        type: Schema.Types.ObjectId,
        ref: "appointment",
        default: "",
        required: false,
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
