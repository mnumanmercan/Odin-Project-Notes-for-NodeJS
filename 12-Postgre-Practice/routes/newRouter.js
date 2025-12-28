const { Router } = require("express");
const { createUsernameGet, createUsernamePost } = require("../controllers/newController.js");

const newRouter = Router();

newRouter.get('/new', createUsernameGet);
newRouter.post('/new', createUsernamePost);


module.exports = newRouter;