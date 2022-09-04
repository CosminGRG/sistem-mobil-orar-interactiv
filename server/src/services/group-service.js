const { GroupRepository } = require("../database");
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

class GroupService {
  constructor() {
    this.repository = new GroupRepository();
  }

  async CreateGroup(userInputs) {
    const { name, description, orar } = userInputs;

    var searchfield = await createEdgeNGrams(name + " " + description);

    try {
      const newGroup = await this.repository.CreateGroup({
        name,
        description,
        searchfield,
        orar,
      });

      return FormateData({ id: newGroup._id, name });
    } catch (error) {
      console.log(error);
    }
  }

  async DeleteGroup(id) {
    if (id == null) return;
    try {
      const result = await this.repository.DeleteGroup(id);
      return FormateData(result);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async GetGroup(id) {
    if (id == null) return;
    try {
      const existingGroup = await this.repository.FindGroupById(id);
      return FormateData(existingGroup);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async UpdateGroup(id, userInputs) {
    const { name, description, orar } = userInputs;

    var searchfield = await createEdgeNGrams(name + " " + description);
    var inputs = userInputs;
    inputs.searchfield = searchfield;

    try {
      const result = await this.repository.UpdateGroup(id, userInputs);

      return FormateData({ result });
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async GetAllGroups() {
    try {
      const groups = await this.repository.GetAllGroups();

      return FormateData(groups);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }

  async FindGroups(groupSearchString) {
    try {
      const groups = await this.repository.FindGroups(groupSearchString);

      return FormateData(groups);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }
}

module.exports = GroupService;
