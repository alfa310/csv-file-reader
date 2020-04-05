/**
 * Datasource: Layer that holds the data related code, must be called only from a Service.
 * DataDatasource: Class that controls all the data interactions with
 * the Data collection and a Service.
 */
class DataDatasource {
  /**
   * @constructor
   * @param {DatabaseClient} client Database client connector.
   */
  constructor(client) {
    this.client = client;
  }
  /**
   * Inserts a new data document in the Data collection async.
   * @param {Data} data All the information needed in order to create a provider
   */
  async saveDataAsync(data) {
    const { Data } = this.client;
    const newData = new Data(data).save();
  }

  /**
   * Get all Rows that belongs to the File with FileID = fileID
   * @param {String} fileID id of the file that contains all the rows saved in the collection. 
   */
  async getRowsSortedByFileId(fileID) {
    const { Data } = this.client;
    const rows = await Data.find({ fileID }).sort({ rowNum: 1 }).exec();
    return rows;
  }
}

module.exports = DataDatasource;
