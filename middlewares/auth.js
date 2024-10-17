// import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { UserModel } from "../models/user.js";
import { permissions } from "../utils/rbac.js";

export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256']
});

export const hasPermission  = (action) => {
    return async (req, res, next) => {
        try {
             // Find user from database
             const user = await UserModel.findById(req.auth.id);
            // Use the user role to find their permission
            const permission = permissions.find(value => value.role === user.role);
            if (!permission) {
                return res.status(403).json('No permission found!');
            }
            // Check if permission actions include action
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed')
            }
        } catch (error) {
            next(error);
        }
    }
}




// export const isAuthenticated = (req, res, next) => {
//     try {
//         // Get authorizatition from headers
//         const authorization = req.headers.authorization;
//         console.log(authorization);
//         // Extract token from the authorization header
//         const token = authorization.split(' ')[1];
//         // Verify and decode the token to get the user
//         const decoded = jwt.verify(
//             token,
//             process.env.JWT_PRIVATE_KEY
//         );
//         // Attach user to request
//         req.user = { id: decoded.id }
//         // Hand over request to the next middleware/controller 
//         next();
//     } catch (error) {
//         next(error);
//     }
// }