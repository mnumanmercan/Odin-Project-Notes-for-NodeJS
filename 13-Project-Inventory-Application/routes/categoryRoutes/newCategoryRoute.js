import { newCategoryGet, newCategoryPost } from "../../controllers/categoryControllers/newCategoryController.js";
import { Router } from "express";
const newCategoryRouter = Router();

newCategoryRouter.get('/', newCategoryGet);
newCategoryRouter.post('/', newCategoryPost);

export default newCategoryRouter;