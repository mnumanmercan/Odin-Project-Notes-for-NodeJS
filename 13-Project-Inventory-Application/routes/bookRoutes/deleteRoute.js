import { deleteBook, deleteAuthor, deleteCategory } from "../../controllers/bookControllers/deleteBookController.js";
import { Router } from "express";

const deleteRouter = Router();
const deleteAuthorRouter = Router();
const deleteCategoryRouter = Router();

deleteRouter.get('/:id', deleteBook);
deleteAuthorRouter.get('/:id', deleteAuthor);
deleteCategoryRouter.get('/:id', deleteCategory);

export default { deleteRouter, deleteAuthorRouter, deleteCategoryRouter };