const express = require("express");
const bodyParser = require('body-parser');
const { CreateProviderService, GetAllProvidersService, UpdateProviderService } = require("@services");

const router = express.Router();
var jsonParser = bodyParser.json()

router.get("/", async function (req, res, next) {
  try {
    const service = new GetAllProvidersService(req.dataContext);
    const providers = await service.execute();
    res.status(200).json({ providers: providers });
  } catch (error) {
    res.status(error.status).json(error);
  }
});

router.post("/",jsonParser, async function (req, res, next) {
  try {
    const service = new CreateProviderService(req.dataContext);
    const provider = await service.execute(req.body);
    res.status(200).json(provider);
  } catch (error) {
    res.status(error.status).json(error);
  }
  
});

router.put("/",jsonParser, async function (req, res, next) {
  try {
    const providerId = req.query.id;
    const service = new UpdateProviderService(req.dataContext);
    const provider = await service.execute(providerId, req.body);
    res.status(200).json(provider);
  } catch (error) {
    res.status(error.status).json(error);
  }
  
});

module.exports = router;
