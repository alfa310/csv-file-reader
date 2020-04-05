const Joi = require("joi");
const {
  InternalServerError,
  InputValidationError,
} = require("@common/errors");
const {
  ProviderParser
} = require("@services/parsers");


class UpdateProviderService {
  constructor(context) {
    this.providerDatasource = context.datasources.providerDatasource;
  }

  static validateInput(input) {
    const inputSchema = Joi.object().keys({
      name: Joi.string().required(),
      fieldMatch: Joi.object()
        .keys({
          uuid: Joi.string().required().allow(null),
          vin: Joi.string().required().allow(null),
          make: Joi.string().required().allow(null),
          model: Joi.string().required().allow(null),
          mileage: Joi.string().required().allow(null),
          year: Joi.string().required().allow(null),
          price: Joi.string().required().allow(null),
          zipCode: Joi.string().required().allow(null),
          createDate: Joi.string().required().allow(null),
          updateDate: Joi.string().required().allow(null),
        })
        .required(),
    });
    const result = Joi.validate(input, inputSchema);
    if (!result.error) {
      return true;
    }
    throw new InputValidationError(result.error);
  }

  async execute(providerId, input) {
    UpdateProviderService.validateInput(input);
    try {
     const savedProvider = await this.providerDatasource.updateProvider(providerId, input); 
     return ProviderParser.parseProvider(savedProvider);
    } catch (error) {
      throw new InternalServerError(
        error,
        `Failed during use of service: UpdateProviderService at Service layer`
      );
    }
  }

  
}

module.exports = UpdateProviderService;
