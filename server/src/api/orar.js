const OrarService = require("../services/orar-service");

const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const orarService = new OrarService();

  app.post("/addorartouser", async (req, res, next) => {
    try {
      const { user_id, orar_id } = req.body;
      const { data } = await orarService.AddOrarToUser({ user_id, orar_id });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/addtimetabletogroup", async (req, res, next) => {
    try {
      const { group_id, orar_id } = req.body;
      const { data } = await orarService.AddOrarToGroup({
        group_id,
        orar_id,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/timetable", async (req, res, next) => {
    try {
      const { tag, shorttag, startDate, endDate, zile } = req.body;
      const { data } = await orarService.CreateTimetable({
        tag,
        shorttag,
        startDate,
        endDate,
        zile,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/timetables", async (req, res, next) => {
    try {
      const { data } = await orarService.GetAllTimetables();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/timetable/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await orarService.GetAllTimetables();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/timetable/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await orarService.DeleteTimetable(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/timetables/search", async (req, res, next) => {
    try {
      const { orarSearchString } = req.body;
      const { data } = await orarService.FindTimetables(orarSearchString);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
};
