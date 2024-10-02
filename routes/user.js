import { Router } from "express";
import { login, logout, register } from "../controllers/user.js";

// create router
const userRouter = Router();

// define the routes
userRouter.post("/users/register", register);

userRouter.post("/users/login", login);

userRouter.post("/users/logout", logout);


// export router
export default userRouter
