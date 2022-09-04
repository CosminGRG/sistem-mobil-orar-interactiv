const UserService = require("../services/user-service");
const UserAuth = require("./middlewares/auth");
const AdminAuth = require("./middlewares/adminAuth");
//const ErrorHandler = require("../utils/error-handler");

module.exports = (app) => {
  const userService = new UserService();

  app.post("/signup", async (req, res, next) => {
    try {
      const {
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
      } = req.body;
      const { data } = await userService.SignUp({
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
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await userService.SignIn({ email, password });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/user/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await userService.DeleteUser(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/users/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await userService.GetUser(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/user/professors", async (req, res, next) => {
    try {
      const { professorSearchString } = req.body;
      const { data } = await userService.SearchProfessors(
        professorSearchString
      );
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.put("/user/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        firstname,
        lastname,
        email,
        password,
        faculty,
        department,
        uniyear,
        group,
        professor,
        administrator,
      } = req.body;
      const { data } = await userService.UpdateUser(id, {
        firstname,
        lastname,
        email,
        password,
        faculty,
        department,
        uniyear,
        group,
        professor,
        administrator,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/user/profile", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await userService.GetProfile(_id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/user/orar", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await userService.GetUserOrar(_id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/user/appointments", UserAuth, async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await userService.GetUserAppointments({ _id });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/users/search", UserAuth, async (req, res, next) => {
    try {
      const { searchPhrase } = req.body;
      const { data } = await userService.FindUsers(searchPhrase);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/users", async (req, res, next) => {
    try {
      const { data } = await userService.GetAllUsers();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
};
