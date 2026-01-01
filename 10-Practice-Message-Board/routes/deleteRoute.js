import { deleteUserController } from "../controller/deleteUserController.js";
import { Router } from "express";
const deleteRoute = Router();

deleteRoute.get('/:id', deleteUserController);

export default deleteRoute;