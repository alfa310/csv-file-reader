const express = require("express");
const formidable = require("formidable");

const { SaveFileService, GetFileService } = require("@services");
const { InternalServerError } = require("@common/errors");

const router = express.Router();


router.get("/",  async function (req, res, next) {
  try {
    const fileId = req.query.id;
    const service = new GetFileService(req.dataContext);
    const file = await service.execute(fileId);
    res.status(200).json(file);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

router.post("/", async function (req, res, next) {
  const form = formidable({
    maxFileSize: process.env.MAX_CSV_FILE_SIZE,
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        throw new InternalServerError(
          `File cannot be parsed with error:${err}`
        );
      }
      const service = new SaveFileService(req.dataContext);
      const file = await service.execute({
        provider: fields.provider,
        filePath: files.file.path,
        fileName: files.file.name,
      });
      res.status(200).json(file);
    } catch (error) {
      res.status(error.status).json(error);
    }
  });
});

module.exports = router;
