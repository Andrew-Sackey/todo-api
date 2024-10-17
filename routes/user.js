import { Router } from "express";
import { getprofile, login, logout, register, updateProfile } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";

// create router
const userRouter = Router();

// define the routes
userRouter.post("/users/register", register);

userRouter.post("/users/login", login);

userRouter.get('/users/me', isAuthenticated, hasPermission('get_profile'), getprofile); 

userRouter.post("/users/logout", isAuthenticated, logout);

userRouter.patch('/users/me', isAuthenticated,  hasPermission('update_profile'), userAvatarUpload.single('avatar'), updateProfile)


// export router
export default userRouter
