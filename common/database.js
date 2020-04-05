const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
/**
 * Create a new Mongo Memory Server instance and connect the mongoose client.
 */
const initDatabase = () => {
  const mongoServer = new MongoMemoryServer();
  mongoose.Promise = Promise;
  mongoServer.getUri().then(mongoUri => {
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };

    mongoose.connect(mongoUri, mongooseOpts);
    mongoose.connection.on("error", e => {
      if (e.message.code === "ETIMEDOUT") {
        console.log(e);
        mongoose.connect(mongoUri, mongooseOpts);
      }
      console.log(e);
    });

    mongoose.connection.once("open", () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
  });
};


module.exports = {
  initDatabase
};
