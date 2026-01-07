import { categoriesGet } from "../../controllers/categoryControllers/categoriesController.js";
import { Router } from "express";

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesGet);

export default categoriesRouter;