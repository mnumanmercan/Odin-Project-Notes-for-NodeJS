import { getTargetUser } from "../controller/userController.js";
import { Router } from "express";
const userRoute = Router();

userRoute.get('/:id', getTargetUser);

export default userRoute;