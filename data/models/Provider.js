const mongoose = require('mongoose');

/**
 * Mongoose schema that holds all the configuration needed to enable the csv upload service.
 * name: name of the provider, must be unique since this will be used to get the appropiate configuration.
 * fieldMatch: name of each field in the provider's configuration, it will be null if the providers doesn't send the field.
 * createdAt, updatedAt and updatedBy: information stored to enable auditing
 */
const ProviderSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  fieldMatch: {
    uuid: { type: String, default: null },
    vin: { type: String, default: null },
    make: { type: String, default: null },
    model: { type: String, default: null },
    mileage: { type: String, default: null },
    year: { type: String, default: null },
    price: { type: String, default: null },
    zipCode: { type: String, default: null },
    createDate: { type: String, default: null },
    updateDate: { type: String, default: null },
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

const Provider = mongoose.model("Provider", ProviderSchema);
module.exports = Provider;
