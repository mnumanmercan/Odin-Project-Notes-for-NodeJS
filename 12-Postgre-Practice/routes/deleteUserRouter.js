const { Router } = require("express");
const { deleteAllUsers } = require("../controllers/deleteUsersController.js");
const deleteUserRouter = Router();

deleteUserRouter.get('/', deleteAllUsers);

module.exports = deleteUserRouter;