const { AppointmentRepository } = require("../database");
const {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
  createEdgeNGrams,
} = require("../utils");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../utils/app-errors");

class AppointmentService {
  constructor() {
    this.repository = new AppointmentRepository();
  }

  async CreateAppointment(userInputs) {
    try {
      const result = await this.repository.CreateAppointment(userInputs);

      return FormateData(result);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async DeleteAppointment(id) {
    try {
      const result = await this.repository.DeleteAppointmentById(id);

      return FormateData(result);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async UpdateAppointmentConfirmed(userId, appointmentId, confirmed) {
    try {
      const result = await this.repository.UpdateAppointmentConfirmedById(
        userId,
        appointmentId,
        confirmed
      );

      return FormateData(result);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }
}

module.exports = AppointmentService;
