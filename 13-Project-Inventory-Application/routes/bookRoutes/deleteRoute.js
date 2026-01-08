import { deleteBook } from "../../controllers/bookControllers/deleteBookController.js";
import { Router } from "express";

const deleteRouter = Router();

deleteRouter.get('/:id', deleteBook);

export default deleteRouter;