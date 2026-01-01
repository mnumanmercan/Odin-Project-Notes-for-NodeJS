import { Router } from "express";
import { createMessageGet, createMessagePost } from "../controller/newMessageController.js";
const newRouter = Router();

newRouter.get('/new', createMessageGet);
newRouter.post('/new', createMessagePost);
    
export default newRouter;