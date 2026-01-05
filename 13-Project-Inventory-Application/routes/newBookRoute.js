import { newBookPost, newBookGet } from "../controllers/newBookController.js";
import { Router } from "express";
const newBookRouter = Router();

newBookRouter.get('/', newBookGet);
newBookRouter.post('/', newBookPost);

export default newBookRouter;