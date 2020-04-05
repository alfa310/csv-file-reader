const Joi = require("joi");
const {
  InternalServerError,
} = require("@common/errors");
const {
  ProviderParser
} = require("@services/parsers");

class GetAllProvidersService {
  constructor(context) {
    this.providerDatasource = context.datasources.providerDatasource;
  }


  async execute(input) {
    try {
     const providers = await this.providerDatasource.getAllProviders(); 
     return ProviderParser.parseProviders(providers);
    } catch (error) {
      throw new InternalServerError(
        error,
        `Failed during use of service: GetAllProvidersService at Service layer`
      );
    }
  }

  
}

module.exports = GetAllProvidersService;
