const express = require("express");
const { PORT } = require("./config");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const ErrorHandler = require("./utils/error-handler");

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  await expressApp(app);

  app.use(ErrorHandler);

  app
    .listen(process.env.PORT || PORT, () => {
      console.log(`User listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
