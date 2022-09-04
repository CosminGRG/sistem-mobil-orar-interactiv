const GroupService = require("../services/group-service");

const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const groupService = new GroupService();

  app.post("/group", async (req, res, next) => {
    try {
      const { name, description, orar } = req.body;
      const { data } = await groupService.CreateGroup({
        name,
        description,
        orar,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/group/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await groupService.DeleteGroup(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/groups", async (req, res, next) => {
    try {
      const { data } = await groupService.GetAllGroups();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/group/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = await groupService.GetGroup(id);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.put("/group/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, orar } = req.body;
      const { data } = await groupService.UpdateGroup(id, {
        name,
        description,
        orar,
      });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/groups/search", async (req, res, next) => {
    try {
      const { groupSearchString } = req.body;
      const { data } = await groupService.FindGroups(groupSearchString);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/addusertogroup", async (req, res, next) => {
    try {
      const { user_id, group_id } = req.body;
      const { data } = await groupService.AddUserToGroup({ user_id, group_id });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
};
