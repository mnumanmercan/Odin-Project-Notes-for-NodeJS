const { Router } = require("express");
const { getUsernames } = require("../controllers/indexController.js");
const indexRouter = Router();


indexRouter.get('/', getUsernames);

module.exports = indexRouter;