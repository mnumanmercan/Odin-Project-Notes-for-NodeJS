import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { registerUserPage, loginUserPage } from "../controllers/userPageController.js";
const userRouter = express.Router();

userRouter.get("/register", registerUserPage);
userRouter.get("/login", loginUserPage);

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;