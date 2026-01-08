import { deleteAuthor } from "../../controllers/authorControllers/deleteAuthorController.js";
import { Router } from "express";

const deleteAuthorRouter = Router();

deleteAuthorRouter.get('/:id', deleteAuthor);

export default deleteAuthorRouter;