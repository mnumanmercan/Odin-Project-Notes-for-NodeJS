const { Router } = require("express");
const { searchUserName } = require("../controllers/searchController.js");
const searchRouter = Router();

searchRouter.get('/', searchUserName);

module.exports = searchRouter;