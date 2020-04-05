/**
 * Datasource: Layer that holds the data related code, must be called only from a Service.
 * ProviderDatasource: Class that controls all the data interactions with 
 * the Provider collection and a Service. 
 */
class ProviderDatasource {
  /**
   * @constructor
   * @param {DatabaseClient} client Database client connector. 
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Inserts a new provider document in the Provider collection.
   * @param {Provider} provider  All the information needed in order to create a provider
   */
  async saveProvider(provider) {
    const { Provider } = this.client;
    const newProvider = await new Provider(provider).save();
    return newProvider;
  }

  /**
   * Obtain all the providers documents stored in the Provider collection.
   */
  async getAllProviders() {
    const { Provider } = this.client;
    const providers = await Provider.find().exec();
    return providers;
  }

  /**
   *  Updates a  provider document by its id.
   * @param {ID} providerId Id of a provider document. 
   * @param {*} data data that needs to be updated in the Provider's document.
   */
  async updateProvider(providerId, data) {
    const { Provider } = this.client;
    data.updatedAt = new Date();
    const provider = await Provider.findOneAndUpdate(
      {
        _id: providerId
      },
      data,
      {
        new: true,
        useFindAndModify: false
      }
    ).exec();
    return provider;
  }

  /**
   *  Gets a provider by its name, will return null if the provider is not found.
   * @param {String} name Name of the provider 
   */
  async getProviderByName(name) {
    const { Provider } = this.client;
    const provider = await Provider.findOne({name}).exec();
    return provider;
  }
}

module.exports = ProviderDatasource;
