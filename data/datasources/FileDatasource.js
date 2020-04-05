/**
 * Datasource: Layer that holds the data related code, must be called only from a Service.
 * FileDatasource: Class that controls all the data interactions with 
 * the File collection and a Service. 
 */
class FileDatasource {
  /**
  * @constructor
  * @param {DatabaseClient} client Database client connector. 
  */
 constructor(client) {
   this.client = client;
 }
/**
* Inserts a new data document in the Data collection async.
* @param {File} file All the information needed in order to create a provider
*/
 async createFile(file) {
   const { File } = this.client;
   const newFile = await new File(file).save();
   return newFile;
 }
/**
 * Gets a file wich id is fileId, otherwise returns null
 * @param {String} fileId Database internal id of a file 
 */
 async getFileById(fileId) {
  const { File } = this.client;
  const file = await File.findOne({_id:fileId}).exec();
  return file;
}

}

module.exports = FileDatasource;
