const { SearchRepository } = require("../database");
const { FormateData } = require("../utils");
const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../utils/app-errors");

class SearchService {
  constructor() {
    this.repository = new SearchRepository();
  }

  async GetSearchResult(searchphrase) {
    try {
      const searchResult = await this.repository.ProcessSearchPhrase(
        searchphrase
      );

      return FormateData(searchResult);
    } catch (error) {
      throw new APIError("Data not found", error);
    }
  }
}

module.exports = SearchService;
