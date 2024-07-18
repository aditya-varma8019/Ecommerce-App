import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/auth.js";
import JWT from "jsonwebtoken";


const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, role } = req.body;

        if (!name) {
            return res.send({
                success: false,
                message: "Name is required"
            })
        }
        if (!email) {
            return res.send({
                success: false,
                message: "Email is required"
            })
        }
        if (!password) {
            return res.send({
                success: false,
                message: "Password is required"
            })
        }
        if (!phone) {
            return res.send({
                success: false,
                message: "Phone is required"
            })
        }
        if (!address) {
            return res.send({
                success: false,
                message: "Address is required"
            })
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Email already exists"
            })
        }
        else {
            const hashedPassword = await hashPassword(password);
            const newUser = await new userModel({
                name, email, password: hashedPassword, phone, address
            })

            await newUser.save();

            res.status(201).send({
                success: true,
                message: "Registration successful",
                newUser
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Registration failed",
            error
        })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Please provide email and password"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Invalid email"
            })
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid password"
            })
        }


        const userToken = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            userToken,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Login failed",
            error
        })
    }
}

const testController = async (req, res) => {
    res.send('Test controller');
}

export { registerController, loginController, testController }