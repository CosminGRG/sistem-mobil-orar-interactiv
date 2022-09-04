const { UserModel, GroupModel, OrarModel } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId();

class OrarRepository {
  async CreateTimetable({ tag, shorttag, startDate, endDate, zile }) {
    try {
      const timetable = new OrarModel({
        tag,
        shorttag,
        startDate,
        endDate,
        zile,
      });

      timetable.markModified("zile.orarItems");
      const timetableResult = await timetable.save();
      return timetableResult;
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllTimetables() {
    try {
      var result = await OrarModel.find();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteTimetable(id) {
    try {
      const result = await OrarModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async FindTimetables(searchPhrase) {
    var regex = new RegExp(searchPhrase, "i");
    try {
      var result = await OrarModel.find({
        $and: [{ searchfield: regex }, { shorttag: { $ne: null } }],
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async AddOrarToUser({ user_id, orar_id }) {
    try {
      return await UserModel.updateOne({ _id: user_id }, { orar: orar_id });
    } catch (error) {
      console.log(error);
    }
  }

  async AddOrarToGroup({ group_id, orar_id }) {
    try {
      const group = await GroupModel.findById(group_id);

      if (group) {
        group.orar = orar_id;
      }
      return await group.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = OrarRepository;
