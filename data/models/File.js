const mongoose = require("mongoose");

/**
 * Mongoose schema that represents a csv file recieved.
 * providerID: Id from the Provider collection
 * name: original name of the uploaded file
 * rowNum: row number of the csv file (the header doesn't count)
 * rowContent: the content of the row (some lines might be null)
 * createdAt, updatedAt and updatedBy: information stored to enable auditing
 */
const FileSchema = new mongoose.Schema({
  providerID: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
    default: "SYSTEM",
  },
});

const File = mongoose.model("File", FileSchema);
module.exports = File;
