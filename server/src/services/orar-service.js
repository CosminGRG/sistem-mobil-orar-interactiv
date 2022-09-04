const { OrarRepository } = require("../database");
const { FormateData } = require("../utils");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../utils/app-errors");

class OrarService {
  constructor() {
    this.repository = new OrarRepository();
  }

  async CreateTimetable(userInputs) {
    const { tag, shorttag, startDate, endDate, zile } = userInputs;

    try {
      const newTimetable = await this.repository.CreateTimetable({
        tag,
        shorttag,
        startDate,
        endDate,
        zile,
      });

      return FormateData({ newTimetable });
    } catch (error) {
      console.log(error);
    }
  }

  async GetAllTimetables() {
    try {
      const timetables = await this.repository.GetAllTimetables();

      return FormateData(timetables);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async DeleteTimetable(id) {
    if (id == null) return;
    try {
      const result = await this.repository.DeleteTimetable(id);
      return FormateData(result);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async FindTimetables(timetableSearchString) {
    try {
      const timetables = await this.repository.FindTimetables(
        timetableSearchString
      );

      return FormateData(timetables);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async AddOrarToUser(userInputs) {
    const { user_id, orar_id } = userInputs;

    try {
      const newUser = await this.repository.AddOrarToUser({
        user_id,
        orar_id,
      });

      return FormateData({ id: newUser._id, orar_id });
    } catch (error) {
      console.log(error);
    }
  }

  async AddOrarToGroup(userInputs) {
    const { group_id, orar_id } = userInputs;

    try {
      const newGroup = await this.repository.AddOrarToGroup({
        group_id,
        orar_id,
      });

      return FormateData({ id: newGroup._id, orar_id });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = OrarService;
