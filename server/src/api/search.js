const SearchService = require("../services/search-service");

const UserAuth = require("./middlewares/auth");

module.exports = (app) => {
  const searchService = new SearchService();

  app.get("/search/:searchphrase", UserAuth, async (req, res, next) => {
    try {
      const { searchphrase } = req.params;
      const { data } = await searchService.GetSearchResult(searchphrase);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });
};
