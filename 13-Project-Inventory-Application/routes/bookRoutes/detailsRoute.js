import { getTargetBook } from "../../controllers/bookControllers/detailsController.js";
import { Router } from "express";

const detailsRouter = Router();

detailsRouter.get('/:id', getTargetBook);

export default detailsRouter;