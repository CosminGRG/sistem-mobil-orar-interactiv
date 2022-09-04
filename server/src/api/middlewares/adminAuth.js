const { ValidateSignature } = require("../../utils");
const { UserRepository } = require("../../database");

module.exports = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req);

  if (isAuthorized) {
    const { _id } = req.user;
    repository = new UserRepository();
    console.log(_id);
    var result = await repository.FindUserById({ _id });
    console.log(result);
    return next();
  }
  return res.status(403).json({ message: "Not Authorized" });
};
