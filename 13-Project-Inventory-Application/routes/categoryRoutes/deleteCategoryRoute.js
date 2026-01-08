import { deleteCategory } from "../../controllers/categoryControllers/deleteCategoryController.js";
import { Router } from "express";

const deleteCategoryRouter = Router();

deleteCategoryRouter.get('/:id', deleteCategory);

export default deleteCategoryRouter;