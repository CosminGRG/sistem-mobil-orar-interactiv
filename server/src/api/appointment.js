const AppointmentService = require("../services/appointment-service");

const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const appointmentService = new AppointmentService();

  app.post("/appointment", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const {
        title,
        description,
        location,
        locationType,
        inputStartDate,
        inputEndDate,
        invitedPeople,
      } = req.body;
      var invitedPeopleInput = req.body.invitedPeople;
      const { data } = await appointmentService.CreateAppointment({
        _id,
        title,
        description,
        location,
        locationType,
        inputStartDate,
        inputEndDate,
        invitedPeopleInput,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/appointments/:id", UserAuth, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await appointmentService.DeleteAppointment(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/appointments/:id", UserAuth, async (req, res, next) => {
    try {
      const userId = req.user._id;
      const appointmentId = req.params.id;
      const { confirmed } = req.body;
      const { data } = await appointmentService.UpdateAppointmentConfirmed(
        userId,
        appointmentId,
        confirmed
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
};
