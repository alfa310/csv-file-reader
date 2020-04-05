const mongoose = require("mongoose");

/**
 * Mongoose schema that represents a csv row recieved.
 * fileID: Id from the File collection
 * providerID: Id from the Provider collection
 * rowNum: row number of the csv file (the header doesn't count)
 * rowContent: the content of the row (some lines might be null)
 * createdAt, updatedAt and updatedBy: information stored to enable auditing
 */
const DataSchema = new mongoose.Schema({
  providerID: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  fileID: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
  rowNum: String,
  rowContent: {
    uuid: String,
    vin: String,
    make: String,
    model: String,
    mileage: String,
    year: String,
    price: String,
    zipCode: String,
    createDate: String,
    updateDate: String,
  },
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

const Data = mongoose.model("Data", DataSchema);
module.exports = Data;
