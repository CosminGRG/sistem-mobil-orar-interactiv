const { UserModel, AppointmentModel } = require("../models");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId();

class AppointmentRepository {
  async CreateAppointment(userInputs) {
    const {
      _id,
      title,
      description,
      location,
      locationType,
      inputStartDate,
      inputEndDate,
      invitedPeopleInput,
    } = userInputs;

    var invitedPeopleObj = {
      participant: "",
      confirmed: "Pending",
    };

    var invited = new Array();
    invitedPeopleInput.forEach((e) => {
      invitedPeopleObj.participant = e;
      invitedPeopleObj.confirmed = "Pending";
      invited.push(invitedPeopleObj);
      invitedPeopleObj = {};
    });

    var createdBy = _id;
    var appointment = new AppointmentModel({
      title,
      description,
      location,
      locationType,
      createdBy,
      invitedPeople: invited,
      startDate: inputStartDate,
      endDate: inputEndDate,
    });

    var people = invitedPeopleInput;
    people.push(_id);

    try {
      var doc = await appointment.save();

      await UserModel.updateMany(
        { _id: { $in: people } },
        {
          $push: { appointments: appointment },
        }
      );

      return doc;
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteAppointmentById(id) {
    try {
      var result = await AppointmentModel.deleteOne({ _id: id });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async UpdateAppointmentConfirmedById(userId, appointmentId, confirmed) {
    try {
      var result = await AppointmentModel.updateOne(
        {
          _id: appointmentId,
          "invitedPeople.participant": userId,
        },
        {
          $set: { "invitedPeople.$.confirmed": confirmed },
        }
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AppointmentRepository;
