import { authorsGet  } from "../../controllers/authorControllers/authorController.js";
import { Router } from "express";

const authorsRouter = Router();

authorsRouter.get('/', authorsGet);

export default authorsRouter;