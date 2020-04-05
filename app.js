const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require('module-alias/register');
const FilesRouter = require("@routes/FilesRouter");
const ProvidersRouter = require("@routes/ProvidersRouter");
const DataContext = require("@data/DataContext");
const Configuration = require("@common/Configuration");

const bootstrap = async () => {

  Configuration.configure();
  const app = express();
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(DataContext.attachContext);
  app.use("/api/file", FilesRouter);
  app.use("/api/provider", ProvidersRouter);

  const listener = app.listen(8080, function () {
    console.log("Listening on port " + listener.address().port);
  });
};
bootstrap();
