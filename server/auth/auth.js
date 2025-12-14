import jwt from "jsonwebtoken";
import User from "../user/userModel.js";
// middleware to protect routes
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.json({ success: false, message: "User Not Found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }   
}