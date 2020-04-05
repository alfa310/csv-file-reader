const database = require("./models");
const { DataDatasource, FileDatasource, ProviderDatasource } = require("@data/datasources");

/**
 * Creates a context for each request.
 */
const getContext = () => {
  return {
    datasources: {
      dataDatasource: new DataDatasource(database),
      fileDatasource: new FileDatasource(database),
      providerDatasource: new ProviderDatasource(database),
    },
  };
};

/**
 * Attach the context to the current request.
 * @param {express.req} req RequestData from the API request 
 * @param {express.res} _ Not used 
 * @param {express.next} next express Function that sends the req and res to the next pipe. 
 */
const attachContext = (req, _, next) => {
  const context = getContext();
  req.dataContext = context;
  next();
};

module.exports = {
  attachContext
};
