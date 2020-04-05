const Joi = require("joi");
const fs = require("fs");
const csv = require("csv-parser");

const { InternalServerError, InputValidationError } = require("@common/errors");
const { FileParser } = require("@services/parsers");

class SaveFileService {
  constructor(context) {
    this.providerDatasource = context.datasources.providerDatasource;
    this.fileDatasource = context.datasources.fileDatasource;
    this.dataDatasource = context.datasources.dataDatasource;
  }

  static validateInput(input) {
    const inputSchema = Joi.object().keys({
      provider: Joi.string().required(),
      fileName: Joi.string().required(),
      filePath: Joi.string().required(),
    });
    const result = Joi.validate(input, inputSchema);
    if (!result.error) {
      return true;
    }
    throw new InputValidationError(result.error);
  }

  static parseDataForProvider(fieldMatch, data, fileID, providerID, rowNum) {
    const parsedData = {
      providerID,
      fileID,
      rowNum,
      rowContent: {},
    };
    const rowFieldsNeeded = [
      "uuid",
      "vin",
      "make",
      "model",
      "mileage",
      "year",
      "price",
      "zipCode",
      "createDate",
      "updateDate",
    ];

    rowFieldsNeeded.forEach((field) => {
      parsedData.rowContent[field] = fieldMatch[field]
        ? data[fieldMatch[field]]
        : null;
    });

    return parsedData;
  }

  async processFileStream(fileId, filePath, provider) {
    let rowNum = 0;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        rowNum += 1;
        const parsedData = SaveFileService.parseDataForProvider(
          provider.fieldMatch,
          data,
          fileId,
          provider._id,
          rowNum
        );
        this.dataDatasource.saveDataAsync(parsedData);
      });
  }

  async execute(input) {
    SaveFileService.validateInput(input);
    try {
      const provider = await this.providerDatasource.getProviderByName(
        input.provider
      );
      if (!provider) {
        throw new InputValidationError(
          `Provider "${input.provider}" doesn't have a configuration. Please add one first`
        );
      }
      const file = await this.fileDatasource.createFile({
        providerID: provider._id,
        name: input.fileName,
      });
      this.processFileStream(file._id, input.filePath, provider);
      return FileParser.parseEmptyFile(file);
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

module.exports = SaveFileService;
