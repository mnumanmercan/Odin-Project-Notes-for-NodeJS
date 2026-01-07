import { Router } from 'express';
import { booksGet } from '../../controllers/bookControllers/booksController.js';
const bookRouter = Router();

bookRouter.get('/', booksGet);

export default bookRouter;