const { initDatabase } = require('./database');
const dotenv = require("dotenv");

/**
 * Init Basic configuration like setting up environment variables and initiate database.
 */
const configure = () => {
  dotenv.config();
  initDatabase();
}

module.exports = {
  configure
};