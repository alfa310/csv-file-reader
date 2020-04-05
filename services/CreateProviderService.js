const Joi = require("joi");
const {
  InternalServerError,
  InputValidationError,
} = require("@common/errors");
const {
  ProviderParser
} = require("@services/parsers");

/**
 * Service layer: Is the Bussiness Layer
 * In charge of creating a Provider
 */
class CreateProviderService {
  constructor(context) {
    this.providerDatasource = context.datasources.providerDatasource;
  }

  /**
   * Validates that the input that comes from the request is valid.
   * @param {ProviderInput} input providerInput 
   */
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

  /**
   * Validates and creates a new ProviderConfiguration
   * @param {ProviderInput} input providerInput 
   */
  async execute(input) {
    CreateProviderService.validateInput(input);
    try {
     const savedProvider = await this.providerDatasource.saveProvider(input); 
     return ProviderParser.parseProvider(savedProvider);
    } catch (error) {
      throw new InternalServerError(
        error,
        `Failed during use of service: CreateProviderService at Service layer`
      );
    }
  }

  
}

module.exports = CreateProviderService;
