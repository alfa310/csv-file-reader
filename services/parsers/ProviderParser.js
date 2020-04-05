

/**
 * Parse a document that represents a configuration of a particular provider.
 * @param {Provider} savedProvider Provider document that represent a configuration of a particular provider 
 */
const parseProvider = (savedProvider) => {
  return {
    id: savedProvider._id,
    name: savedProvider.name,
    fieldMatch: savedProvider.fieldMatch,
  };
};

/**
 *  Parse a list of providers.
 * @param {Provider} providers  Provider document list that represent each one a configuration of a particular provider 
 */
const parseProviders = (providers) => {
  return providers.map(parseProvider);
}


module.exports = {
  parseProvider,
  parseProviders
}