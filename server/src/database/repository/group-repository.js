const { GroupModel } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId();

class GroupRepository {
  async CreateGroup({ name, description, searchfield, orar }) {
    try {
      const group = new GroupModel({
        name,
        description,
        orar,
        searchfield,
      });
      const groupResult = await group.save();
      return groupResult;
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteGroup(id) {
    try {
      const result = await GroupModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async FindGroupById(id) {
    try {
      const result = await GroupModel.findById(id).populate({
        path: "orar",
        select: "shorttag",
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateGroup(id, inputs) {
    try {
      const group = await GroupModel.findById(id);

      let query = { $set: {} };
      for (let key in inputs) {
        if (group[key] && group[key] !== inputs[key])
          query.$set[key] = inputs[key];
      }
      const result = await GroupModel.updateOne({ _id: id }, query);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllGroups() {
    try {
      var result = await GroupModel.find().populate({
        path: "orar",
        select: "shorttag",
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async FindGroups(searchPhrase) {
    var regex = new RegExp(searchPhrase, "i");
    try {
      var result = await GroupModel.find(
        {
          searchfield: regex,
        },
        { name: 1 }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GroupRepository;
