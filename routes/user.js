import { Router } from "express";
import { getprofile, login, logout, register, updateProfile } from "../controllers/user.js";
import { userAvatarUpload } from "../middlewares/upload.js";

// create router
const userRouter = Router();

// define the routes
userRouter.post("/users/register", register);

userRouter.post("/users/login", login);

userRouter.get('/users/me', getprofile); 

userRouter.post("/users/logout", logout);

userRouter.post('/users/me', userAvatarUpload.single('userAvatar'), updateProfile)


// export router
export default userRouter
