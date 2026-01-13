const { Router } = require("express");
const { deletePost } = require("../controllers/deletePostController.js");

const deleteRouter = Router();

deleteRouter.get('/:id', deletePost)

module.exports = deleteRouter;