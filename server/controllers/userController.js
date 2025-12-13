import bcrypt from 'bcryptjs';
import User from '../user/userModel.js';
import { generateAuthToken } from '../utils/authToken.js';


export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {

        if( !name || !email || !password ) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const user = await User.findOne({ email });

        if(user) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateAuthToken(newUser._id);

        res.json({
            success: true,
            userData: newUser,
            token,
            message: "User created successfully",
        });

    } catch (error) {
        console.error("Error in signup:", error.message);
        res.json({
            success: false,
            message: error.message,
        });
    }
        
}