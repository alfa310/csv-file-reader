const {
  InputValidationError,
  InternalServerError,
} = require("@common/errors");
const {
  FileParser
} = require("@services/parsers");

class GetAllProvidersService {
  constructor(context) {
    this.fileDatasource = context.datasources.fileDatasource;
    this.dataDatasource = context.datasources.dataDatasource;
  }


  async execute(fileId) {
    try {
      const file = await this.fileDatasource.getFileById(fileId);
      if(!file) {
        throw new InputValidationError(`The file with id:${fileId} doesn't exist.`);
      }
      const rows = await this.dataDatasource.getRowsSortedByFileId(fileId);
      return FileParser.parseFullFile(file, rows);
    } catch (error) {
      if (error instanceof InputValidationError) {
        throw error;
      } else {
        throw new InternalServerError(
          error,
          `Failed during use of service: SaveFileService at Service layer`
        );
      }
    }
  }

  
}

module.exports = GetAllProvidersService;
