const { UserModel, OrarModel } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId();

class UserRepository {
  async CreateUser({
    firstname,
    lastname,
    email,
    password,
    faculty,
    department,
    uniyear,
    group,
    orar,
    professor,
    administrator,
    searchfield,
    salt,
  }) {
    try {
      if (orar == null && professor == true) {
        const startDate = new Date("2022-09-01T00:00:00");
        const endDate = new Date("2022-12-31T00:00:00");
        const zile = [
          {
            name: "Luni",
            orarItems: [],
          },
          {
            name: "Marti",
            orarItems: [],
          },
          {
            name: "Miercuri",
            orarItems: [,],
          },
          {
            name: "Joi",
            orarItems: [],
          },
          {
            name: "Vineri",
            orarItems: [],
          },
        ];
        const tag = "custom";
        const shorttag = "custom";

        const newOrar = new OrarModel({
          tag,
          shorttag,
          startDate,
          endDate,
          zile,
        });

        newOrar.markModified("zile.orarItems");
        const orarres = await newOrar.save();

        console.log(orarres);
      }

      const user = new UserModel({
        firstname,
        lastname,
        email,
        password,
        faculty,
        department,
        uniyear,
        salt,
        professor,
        administrator,
        searchfield,
        group,
        orar,
      });

      const userResult = await user.save();
      return userResult;
    } catch (error) {
      console.log(error);
    }
  }

  async AddUserToGroup({ user_id, group_id }) {
    try {
      return await UserModel.updateOne({ _id: user_id }, { group: group_id });
    } catch (error) {
      console.log(error);
    }
  }

  async FindUserByEmail({ email }) {
    try {
      const existingUser = await UserModel.findOne({ email: email });
      return existingUser;
    } catch (error) {
      console.log(error);
    }
  }

  async FindUserById(id) {
    try {
      const existingUser = await UserModel.findById(id).populate("group");
      return existingUser;
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateUser(id, inputs) {
    try {
      const user = await UserModel.findById(id);

      let query = { $set: {} };
      for (let key in inputs) {
        if (inputs[key] !== undefined) {
          if (user[key] && user[key] !== inputs[key])
            // if the field we have in inputs exists, we're gonna update it
            query.$set[key] = inputs[key];
        }
      }
      const result = await UserModel.updateOne({ _id: id }, query);

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteUser(id) {
    try {
      const result = await UserModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async FindUsers(searchPhrase) {
    var regex = new RegExp(searchPhrase, "i");
    try {
      var result = await UserModel.find(
        {
          searchfield: regex,
        },
        { firstname: 1, lastname: 1 }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllUsers() {
    try {
      var result = await UserModel.find().populate("group");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async FindProfessors(searchPhrase) {
    var regex = new RegExp(searchPhrase, "i");
    try {
      var result = await UserModel.find({
        searchfield: regex,
        professor: true,
      }).select("firstname lastname");
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async GetOrarByUserId(id) {
    const user = await UserModel.findOne({ _id: id });
    var result;
    if (user.professor) {
      result = await UserModel.findOne({ _id: id }).populate("orar");
      var orarResult = await OrarModel.aggregate([
        {
          $match: {
            "zile.orarItems.professor": new mongoose.Types.ObjectId(result.id),
          },
        },
        { $unwind: "$zile" },
        { $unwind: "$zile.orarItems" },
        {
          $match: {
            "zile.orarItems.professor": new mongoose.Types.ObjectId(result.id),
          },
        },
      ]);
      var ziindex;
      for (let i = 0; i < orarResult.length; i++) {
        if (orarResult[i].zile.name == "Luni") {
          ziindex = 0;
        } else if (orarResult[i].zile.name == "Marti") {
          ziindex = 1;
        } else if (orarResult[i].zile.name == "Miercuri") {
          ziindex = 2;
        } else if (orarResult[i].zile.name == "Joi") {
          ziindex = 3;
        } else if (orarResult[i].zile.name == "Vineri") {
          ziindex = 4;
        }

        if (result.orar.zile[ziindex].orarItems.length == 0) {
          orarResult.map((item) => {
            result.orar.zile[ziindex].orarItems.push(item.zile.orarItems);
          });
          break;
        } else {
          var match = false;
          for (let j = 0; j < result.orar.zile[ziindex].orarItems.length; j++) {
            var resultItem_id =
              result.orar.zile[ziindex].orarItems[j]._id.toString();
            var orarItem_id = orarResult[i].zile.orarItems._id.toString();
            if (resultItem_id === orarItem_id) {
              match = true;
              continue;
            }
          }
          if (match == false) {
            result.orar.zile[ziindex].orarItems.push(
              orarResult[i].zile.orarItems
            );
          }
        }
      }
      await result.orar.save();
    } else {
      result = await UserModel.findOne({ _id: id }).populate({
        path: "group",
        populate: {
          path: "orar",
          populate: {
            path: "zile.orarItems.professor",
            select: "firstname lastname",
          },
        },
      });
    }

    return result;
  }

  async GetAppointmentsByUserId({ id }) {
    try {
      var result = await UserModel.findById(id)
        .select("_id, appointments")
        .populate({
          path: "appointments",
          populate: {
            path: "createdBy invitedPeople.participant",
            select: "firstname lastname",
          },
        });

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserRepository;
