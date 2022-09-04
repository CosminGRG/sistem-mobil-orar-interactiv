module.exports = {
  databaseConnection: require("./connection"),
  UserRepository: require("./repository/user-repository"),
  OrarRepository: require("./repository/orar-repository"),
  GroupRepository: require("./repository/group-repository"),
  AppointmentRepository: require("./repository/appointment-repository"),
  SearchRepository: require("./repository/search-repository"),
};
