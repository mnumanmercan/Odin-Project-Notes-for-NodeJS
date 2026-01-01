import { Router } from "express";
import { indexGet } from "../controller/indexController.js";
const indexRouter = Router();


indexRouter.get('/', indexGet);

export default indexRouter;