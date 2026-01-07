import { newAuthorGet, newAuthorPost } from "../../controllers/authorControllers/newAuthorController.js";
import { Router } from "express";
const newAuthorRouter = Router();

newAuthorRouter.get('/', newAuthorGet);
newAuthorRouter.post('/', newAuthorPost);

export default newAuthorRouter;