import { indexGet } from '../controllers/indexController.js';
import { Router } from 'express';

const indexRouter = Router();

indexRouter.get('/', indexGet);

export default indexRouter;

